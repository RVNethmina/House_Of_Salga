import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// Function to create a Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_CUSTOMER_SECRET);
};

// Route: User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.status(200).json({ success: true, token, user: { name: user.name, email: user.email } });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route: User Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // 1. Check if user exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // 2. Validate format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password (8+ chars)" });
        }

        // 3. Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // 5. Create User
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        
        res.json({ success: true});

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route: Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Create a token that contains the admin email signature
            const token = jwt.sign(email + process.env.JWT_ADMIN_SECRET, process.env.JWT_ADMIN_SECRET);
            res.status(200).json({ success: true, token, user: { name: "Admin", email: email } });
        } else {
            res.status(401).json({ success: false, message: "Invalid Admin Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route: Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        // 1. Get the ID from the middleware (added by authUser)
        // Note: authUser adds it to req.body.userId
        const { userId, name, email } = req.body; 

        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name and Email are required" });
        }

        // 2. Find the user and update
        // { new: true } returns the updated document instead of the old one
        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            { name, email }, 
            { new: true } 
        ).select('-password'); // Exclude password from the response

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile Updated", user: updatedUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route: Verify Customer Token (Used by AuthContext)
const getProfile = async (req, res) => {
    try {
        // req.body.userId is added by the authUser middleware
        const { userId } = req.body; 
        const user = await userModel.findById(userId).select('-password'); // Don't return password

        if (!user) {
             return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Route: Verify Admin Token (Used by AuthContext)
const verifyAdmin = async (req, res) => {
    // If middleware passed, the token is valid
    res.status(200).json({ success: true, user: { name: "Admin", email: process.env.ADMIN_EMAIL } });
}


export { loginUser, registerUser, adminLogin, getProfile, verifyAdmin , updateUserProfile};
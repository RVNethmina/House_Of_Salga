import jwt from 'jsonwebtoken';

// Middleware for Admin Authentication
const authAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        // Token usually comes as "Bearer <token>", so we split it
        const token = authorization.split(' ')[1]; 
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        const token_decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

        // Typically admin tokens are just signed email/role, so if it verifies, we are good.
        // If the token matches the admin email logic, proceed.
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.JWT_ADMIN_SECRET) {
             return res.status(401).json({ success: false, message: "Not Authorized. Invalid Admin Token." });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Error. Token Invalid." });
    }
};

// Middleware for Customer Authentication
const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        const token_decode = jwt.verify(token, process.env.JWT_CUSTOMER_SECRET);
        
        // Add the user ID to the request body so the controller can use it
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Error. Token Invalid." });
    }
};

export { authAdmin, authUser };
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
await connectDB();

// Connect to Cloudinary
await connectCloudinary();

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS)
// React frontend to talk to the backend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---

// A simple health-check route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the House of Salaga API!' });
});

// Main API routes
app.use('/api/auth', userRouter);
app.use('/api/product', productRouter);

// --- Global Error Handling ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
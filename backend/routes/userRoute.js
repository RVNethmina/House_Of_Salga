import express from 'express';
import { loginUser, registerUser, adminLogin, getProfile, verifyAdmin } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import { authUser, authAdmin } from '../middleware/auth.js';

const userRouter = express.Router();

// Public Routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin/login', adminLogin);

// Protected Routes (Require Token)
userRouter.get('/verify', authUser, getProfile); // For Customer context
userRouter.get('/admin/verify', authAdmin, verifyAdmin); // For Admin context

export default userRouter;
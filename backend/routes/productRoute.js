import express from "express";
import { listProducts, addProduct, removeProduct, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { authAdmin, authUser } from "../middleware/auth.js"; // Protect admin routes

const productRouter = express.Router();

// Route to Add Product (Admin Only, supports up to 4 images)
productRouter.post('/add', authAdmin, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

// Route to Remove Product (Admin Only)
productRouter.post('/remove', authAdmin, removeProduct);

// Route to List All Products (Public)
productRouter.get('/list', listProducts);

// Route to Get Single Product (Public)
productRouter.get('/single/:productId', singleProduct);

export default productRouter;
import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import { authAdmin, authUser } from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', authAdmin, allOrders)
orderRouter.post('/status', authAdmin, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)

// User Features
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter
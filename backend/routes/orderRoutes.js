const express = require('express')
const router = express.Router()

const {
       authenticate, 
       authorizeAdmin
      } = require('../middlewares/authMiddleware.js')

const { 
        createOrder,
        getAllOrders,
        getUserOrders,
        countTotalOrders,
        calculateTotalSales,
        calculateTotalSalesByDate,
        findOrderById,
        markOrderAsPaid,
        markOrderAsDelivered
      } = require('../controllers/orderController.js')


router.post('/create-order', authenticate, createOrder)
router.get('/all-orders', authenticate, authorizeAdmin, getAllOrders)
router.get('/user-orders', authenticate, getUserOrders)
router.get('/total-orders', countTotalOrders)
router.get('/total-sales', calculateTotalSales)
router.get('/total-sales-by-date', calculateTotalSalesByDate)
router.get('/:id', authenticate, findOrderById)
router.put('/pay/:id', authenticate, markOrderAsPaid)
router.put('/deliver/:id', authenticate, authorizeAdmin, markOrderAsDelivered)
module.exports =  router
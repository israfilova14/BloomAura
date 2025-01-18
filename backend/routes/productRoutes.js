const express = require('express')
const upload = require('../middlewares/multer.js')

const router = express.Router()

const {
  authenticate, 
  authorizeAdmin
} = require('../middlewares/authMiddleware.js')

const checkId = require('../middlewares/checkId.js')

const {
  addProduct, 
  updateProductDetails,
  deleteProduct,
  getProducts,
  getAllProducts,
  getProductById,
  addProductReview,
  getTopProducts,
  getNewProducts,
  getFilteredProducts
} = require('../controllers/productController.js')

router.post('/add-product', authenticate, authorizeAdmin, upload.single('image'), addProduct)
router.put('/update-product/:id', authenticate, authorizeAdmin, upload.single('image'), updateProductDetails)
router.delete('/delete-product/:id', authenticate, authorizeAdmin, deleteProduct)
router.get('/get-products', getProducts)
router.get('/all-products', getAllProducts)
router.post('/product-reviews/:id', authenticate, checkId, addProductReview)
router.get('/top-products', getTopProducts)
router.get('/:id', getProductById)
router.get('/new-products', getNewProducts)
router.post('/filtered-products', getFilteredProducts)

module.exports = router
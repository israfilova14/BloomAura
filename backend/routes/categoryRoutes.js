const express = require('express')

const router = express.Router()

const {
       authenticate, 
       authorizeAdmin
      } = require('../middlewares/authMiddleware.js')

const {
       createCategory,
       updateCategory,
       deleteCategory,
       allCategories,
       getCurrentCategory
      } = require('../controllers/categoryController.js')

router.post('/create-category', authenticate, authorizeAdmin, createCategory)
router.put('/update-category/:categoryId', authenticate, authorizeAdmin, updateCategory)
router.delete('/delete-category/:categoryId', authenticate, authorizeAdmin, deleteCategory)
router.get('/all-categories', authenticate, authorizeAdmin, allCategories)
router.get('/:id', getCurrentCategory)
module.exports = router
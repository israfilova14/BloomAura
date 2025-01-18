const express = require('express')

const {
   createUser,
   loginUser,
   logoutUser,
   getAllUsers,
   getCurrentUserProfile,
   updateCurrentUserProfile,
   deleteUserById,
   getUserById,
   updateUserById
 } = require('../controllers/userController.js')

const {
    authenticate, 
    authorizeAdmin
} = require('../middlewares/authMiddleware.js')

const router = express.Router()

// CUSTOMER ROUTES 😊
router.post('/create-user', createUser)
router.post('/auth-user', loginUser)
router.post('/logout-user', logoutUser)
router.get('/all-users', authenticate, authorizeAdmin, getAllUsers)
router.get('/user-profile', authenticate, getCurrentUserProfile)
router.put('/update-profile', authenticate, updateCurrentUserProfile)

// ADMIN ROUTES 😊
router.delete('/delete-user/:id', authenticate, authorizeAdmin, deleteUserById)
router.get('/get-user/:id', authenticate, authorizeAdmin, getUserById)
router.put('/update-user/:id', authenticate, authorizeAdmin, updateUserById)

module.exports = router
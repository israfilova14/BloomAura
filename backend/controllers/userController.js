const asyncHandler = require('../middlewares/asyncHandler.js');
const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const createToken = require('../utilities/createToken.js');

// CREATE USER
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all the inputs' });
  }

  try {
    // Check if user already exists
    const userExists = await userModel.findOne({email: email.trim().toLowerCase()});
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token and return user details
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin || false,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
});

// USER LOGIN
const loginUser = asyncHandler(async(req, res) => {

  const {email, password} = req.body

  const existingUser = await userModel.findOne({email})

  if(existingUser){
     const isPasswordValid = await bcrypt.compare(password, existingUser.password)

     if(isPasswordValid){
        createToken(res, existingUser._id)

        res.status(201).json({
           _id: existingUser._id,
           username: existingUser.username,
           email: existingUser.email,
           isAdmin: existingUser.isAdmin
        })

        return 
     }
     
  }else{
      console.log("User does not exist")
  }
})

// USER LOGOUT
const logoutUser = asyncHandler(async(req, res) => {
   res.cookie('jwt', '', {
     httpOnly: true,
     expires: new Date(0)
   })

   res.status(200).json({message: "Logged out successfully"})
})

// ALL USERS
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await userModel.find({})
    res.json(users)
})

// CURRENT USER PROFILE
const getCurrentUserProfile = asyncHandler(async(req, res) => {
    const user = await userModel.findById(req.user._id)

    if(user){
       res.json({
        _id: user._id,
        username: user.username,
        email: user.email
       })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})

// UPDATE CURRENT USER PROFILE
const updateCurrentUserProfile = asyncHandler(async(req, res) => {
  const user = await userModel.findById(req.user._id)
  
  if(user){
     user.username = req.body.username || user.username
     user.email = req.body.email || user.email

     if(req.body.password){
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(req.body.password, salt)
         user.password = hashedPassword
     }

     const updatedUser = await user.save()

     res.json({
       _id: updatedUser._id,
       username: updatedUser.username,
       email: updatedUser.email,
       isAdmin: updatedUser.isAdmin
     })
  }
  else{
      res.status(404)
      throw new Error("User not found")
  }
})

// DELETE USER BY ID
const deleteUserById = asyncHandler(async(req, res) => {
   const user = await userModel.findById(req.params.id)

   if(user){

      if(user.isAdmin){
         res.status(400)
         throw new Error('Cannot delete admin user')
      }

      await userModel.deleteOne({_id: user._id})
      res.json({
         message: "User deleted successfully!"
      })
   }
   else{
       res.status(404)
       throw new Error("User not found.")
   }
})

// GET USER BY ID
const getUserById = asyncHandler(async(req, res) => {
   const user = await userModel.findById(req.params.id).select('-password')

   if(user){
      res.json(user)
   }
   else{
      res.status(404)
      throw new Error("User not found")
   }
})

// UPDATE USER BY ID
const updateUserById = asyncHandler(async(req, res) => {
    const user = await userModel.findById(req.params.id)

    if(user){
       user.username = req.body.username || user.username
       user.email = req.body.email || user.email
       user.isAdmin = Boolean(req.body.isAdmin)

       const updatedUser = await user.save()

       res.json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin
       })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }

})

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
};

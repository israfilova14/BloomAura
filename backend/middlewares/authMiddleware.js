const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel.js')
const asyncHandler = require('../middlewares/asyncHandler.js')

const authenticate = asyncHandler(async(req, res, next) => {
   let token

   // Read JWT from the 'jwt' cookie
   token = req.cookies.jwt
 
   if(token){
       try{
          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
          req.user = await userModel.findById(decoded.userId).select('-password')
          next()
       }
       catch(error){
          res.status(401)
          throw new Error("Not authorized, token failed")
       }
   }
   else{
      res.status(401)
      throw new Error("Not authorized, no token")
   }
})

const authorizeAdmin = (req, res, next) => {
   if(req.user && req.user.isAdmin){
       next()
   }
   else{
      res.status(401).send("Not authorized as an admin token")
   }
}

module.exports = {authenticate, authorizeAdmin}
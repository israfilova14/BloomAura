const jwt = require('jsonwebtoken')

const generateToken = (res, userId) => {
   try{

      if(!process.env.JWT_SECRET_KEY){
         console.error("JWT_SECRET_KEY is missing in the environment variables!")
         throw new Error("JWT_SECRET_KEY is required for generating the token.")
      }
      
      // Create JWT token
      const token = jwt.sign(
        {userId}, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn: '10d'} // Access token is valid for 10 days
      )

      console.log("Generated token", token)

     // Set JWT as an HTTP-Only Cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 24 * 60 * 60 * 1000
      })

      
      return token
   }
   catch(error){
      console.error("Error generating token:", error.message)
      throw new Error("Error generating token")
   }
}

module.exports = generateToken
// PACKAGES
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

// UTILITES 
const connectDB = require('./config/db.js')
const userRoutes = require('./routes/userRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')

const connectCloudinary = require('./config/cloudinary.js')

dotenv.config()
connectCloudinary()

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// CORS CONFIGURATION
const corsOption = {
   origin: process.env.FRONTEND_URL || 'https://bloomaura-frontend.onrender.com',
   credentials: true
}

app.use(cors(corsOption))

// ROUTES
app.use('/users', userRoutes)
app.use('/category', categoryRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => {
   res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

// SERVER SETUP
const port = process.env.PORT || 7000

connectDB().then(() => {
   app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
   })
})

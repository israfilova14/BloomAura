const asyncHandler = require( "../middlewares/asyncHandler.js")
const productModel = require("../models/productModel.js")
const cloudinary = require('cloudinary')

// UPLOAD PRODUCT
const addProduct = asyncHandler(async (req, res) => {
     try {
       const { name, brand, category, description, price, quantity, countInStock } = req.body
       const imageFile = req?.file?.path
   
       if (!name) return res.status(400).json({ error: 'Name is required' })
       if (!brand) return res.status(400).json({ error: 'Brand is required' })
       if (!category) return res.status(400).json({ error: 'Category is required' })
       if (!description) return res.status(400).json({ error: 'Description is required' })
       if (!price) return res.status(400).json({ error: 'Price is required' })
       if (!quantity) return res.status(400).json({ error: 'Quantity is required' });
       if(!countInStock) return res.status(400).json({error: 'Count In Stock is required'})
          
       let imageUrl = ''
   
       if (imageFile) {
         const uploadResult = await cloudinary.uploader.upload(imageFile, {
           folder: 'beauty_products',
           use_filename: true,
         });
         imageUrl = uploadResult.secure_url
       }
   
       const productData = {
         name,
         brand,
         category,
         description,
         price,
         quantity,
         countInStock,
         image: imageUrl,
       };
   
       const newProduct = new productModel(productData);
       await newProduct.save();
   
       res.status(201).json(newProduct);
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Server error. Please try again later.' });
     }
   });
   
// UPDATE PRODUCT
const updateProductDetails = asyncHandler(async (req, res) => {
     try {
        const { name, brand, category, description, price, quantity } = req.body;
        const imageFile = req?.file?.path;
  
        switch (true) {
           case !name:
              return res.json({ error: 'Name is required' });
           case !brand:
              return res.json({ error: 'Brand is required' });
           case !category:
              return res.json({ error: 'Category is required' });
           case !description:
              return res.json({ error: 'Description is required' });
           case !price:
              return res.json({ error: 'Price is required' });
           case !quantity:
              return res.json({ error: 'Quantity is required' });
        }
  
        const product = await productModel.findById(req.params.id);
  
        if (!product) {
           return res.status(404).json({ error: 'Product not found' });
        }
  
        // Update fields
        product.name = name;
        product.brand = brand;
        product.category = category;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
  
        // If image is provided, upload and update it
        if (imageFile) {
           const uploadResult = await cloudinary.v2.uploader.upload(imageFile, {
              folder: 'BeautyProducts',
              use_filename: true,
           });
           product.image = uploadResult.secure_url;
        }
  
        await product.save();
        res.json(product);
     } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
     }
  });
  

// DELETE PRODUCT
const deleteProduct = asyncHandler(async(req, res) => {
  try{
    const product = await productModel.findByIdAndDelete(req.params.id)
    res.json(product)
  }
  catch(error){
    console.error(error)
    res.status(500).json({error: "Server error"})
  }
})

// GET PRODUCTS
const getProducts = asyncHandler(async(req, res) => {
     try{
        const pageSize = 6
        const keyword = req.query.keyword
        ?
        {name: {$regex: req.query.keyword}, $options: 'i'}
        :
        {}

        const count = await productModel.countDocuments({...keyword})
        const products = await productModel.find({...keyword}).limit(pageSize)
        res.json({
          products,
          page: 1,
          pages: Math.ceil(count / pageSize),
          hasMore: false
        })
     }
     catch(error){
       console.error(error)
       res.status(500).json({error: 'Server error'})
     }
})

// GET ALL PRODUCTS
const getAllProducts = asyncHandler(async(req, res) => {
   try{
      const allProducts = await productModel.find({}).populate('category').sort({createdAt: -1})
      res.json({
          success: true,
          allProducts
      })
   }
   catch(error){
     console.error(error)
     res.status(500).json({
          error: 'Server error'
     })
   }
})

// GET PRODUCT BY ID
const getProductById = asyncHandler(async(req, res) => {
     try{
          const product = await productModel.findById(req.params.id)

          if(product){
               return res.json(product)
          }
          else{
               res.status(404)
               throw new Error("Product not found")
          }
     }
     catch(error){
          console.error(error)
          res.status(404).json({error: 'Product not found'})
     }
})

// PRODUCT REVIEWS
const addProductReview = asyncHandler(async(req, res) => {
    try{
       const {rating, comment} = req.body
       const product = await productModel.findById(req.params.id)

       if(product){
          const alreadyReviewed = product.reviews.find(
               review => review.user.toString() === req.user._id.toString()
          )

          if(alreadyReviewed){
               res.status(400)
               throw new Error("Product already reviewed")
          }

          const review = {
               name: req.user.username,
               rating: Number(rating),
               comment,
               user: req.user._id
          }

          product.reviews.push(review)
          product.numReviews = product.reviews.length

          product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

          await product.save()
          res.status(201).json({message: 'Review added'})
       }
       else{
           res.status(404)
           throw new Error("Product not found")
       }
    }
    catch(error){
      console.log(error)
      res.status(400).json(error.message)
    }
})

// TOP PRODUCTS
const getTopProducts = asyncHandler(async(req, res) => {
    try{
       const products = await productModel.find({}).sort({rating: -1}).limit(4)
       res.json(products)
    }
    catch(error){
       console.error(error)
       res.status(400).json(error.message)
    }
})

// NEW PRODUCTS
const getNewProducts = asyncHandler(async(req, res) => {
    try{
       const products = await productModel.find().sort({_id: -1}).limit(5)
       res.json(products)
    }
    catch(error){
       console.error(error)
       res.status(400).json(error.message)
    }
})

// FILTERED PRODUCTS
const getFilteredProducts = asyncHandler(async(req, res) => {
   try{
     const {checked, radio} = req.body

     let args = {}

     if(checked.length > 0) args.category = checked
     if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]}

     const products = await productModel.find(args)
     res.json(products)
   }
   catch(error){
      console.error(error)
      res.status(500).json({
         error: "Server Error"
      })
   }
})

module.exports = {
  addProduct,
  updateProductDetails,
  deleteProduct,
  getProducts,
  getAllProducts,
  getProductById,
  addProductReview,
  getTopProducts,
  getNewProducts,
  getFilteredProducts,
}
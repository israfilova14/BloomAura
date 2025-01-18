const categoryModel = require("../models/categoryModel")
const asyncHandler = require('../middlewares/asyncHandler')

// CREATE CATEGORY
const createCategory = asyncHandler(async(req, res) => {
  try{
    const {name} = req.body

    if(!name.trim()){
       return res.json({error: "Category name is required"})
    }

    const existingCategory = await categoryModel.findOne({name})

    if(existingCategory){
       return res.json({
        error: "Category name exsists"
       })
    }

    const category = await new categoryModel({name}).save()

    res.json(category)
  }
  catch(error){
    console.log(error)
    return res.status(400).json(error)
  }
})

// UPDATE CATEGORY
const updateCategory = asyncHandler(async(req, res) => {
   try{
      const {name} = req.body
      const {categoryId} = req.params

      const  category = await categoryModel.findOne({_id: categoryId})

      if(!category){
         return res.status(404).json({error: "Category not found"})
      }

      category.name = name

      const updatedCategory = await category.save()

      res.json(updatedCategory)
   }
   catch(error){
    console.error(error)
    res.status(500).json({
       error: "Internal server error"
    })
   }
})

// DELETE CATEGORY
const deleteCategory = asyncHandler(async(req, res) => {
  try{
     const deletedCategory = await categoryModel.findByIdAndDelete(req.params.categoryId)
     res.json(deletedCategory)
  }
  catch(error){
     console.error(error)
     res.status(500).json({error: "Internal server error"})
  }
})

// ALL CATEGORIES
const allCategories = asyncHandler(async(req, res) => {
  try{
    const allCategories = await categoryModel.find({})
    res.json(allCategories)
  }
  catch(error){
     console.error(error)
     return res.status(400).json(error.message)
  }
})

const getCurrentCategory = asyncHandler(async(req, res) => {
  try{
    const category = await categoryModel.findOne({_id: req.params.id})
    res.json(category)
  }
  catch(error){
    console.error(error)
    return res.status(400).json(error.message)
  }
})

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  allCategories,
  getCurrentCategory
}
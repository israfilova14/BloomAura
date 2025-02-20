import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useGetFilteredProductsQuery} from '../../../redux/api/productApiSlice'
import {
        setCategories,
        setProducts,
        setChecked
       } from '../../../redux/features/shop/shopSlice'
import {useGetAllCategoriesQuery} from '../../../redux/api/categoryApiSlice'
import Loader from '../../helpers/loader'
import ProductCard from '../products/product_card'

const Shop = () => {
  const dispatch = useDispatch()
  const {categories, products, checked, radio} = useSelector((state) => state.shop)
  
  const categoriesQuery = useGetAllCategoriesQuery()
  const filteredProductsQuery = useGetFilteredProductsQuery({
     checked, 
     radio
  })
  console.log(filteredProductsQuery)

  const [priceFilter, setPriceFilter] = useState('')

  useEffect(() => {
     if(!categoriesQuery.isLoading){
        dispatch(setCategories(categoriesQuery.data))
     }
  },[categoriesQuery.data, dispatch])

  useEffect(() => {
     if(!checked.length || !radio.length){
        if(!filteredProductsQuery.isLoading){
            // Filter products based on both checked categories and price filter
            const filteredProducts = filteredProductsQuery.data.filter((product) => {
              // Check if the product price included the entered price filter value
              return(
                 product.price.toString().includes(priceFilter) || 
                 product.price === parseInt(priceFilter, 10)
              )
            })

            dispatch(setProducts(filteredProducts))
        }
     }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter])

  const handleBrandClick = (brand) => {
     const productsByBrand = filteredProductsQuery.data?.filter(
        (product) => product.brand === brand
     )
     dispatch(setProducts(productsByBrand))
  }

  const handleCheck = (value, id) => {
     const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id)
     dispatch(setChecked(updatedChecked))
  }

  // Add 'All Brands' option to uniqueBrands
  const uniqueBrands = [
   ...Array.from(
      new Set(
               filteredProductsQuery.data?.map((product) => product.brand)
                                          .filter((brand) => brand !== undefined)
             )
   )
  ]

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value)
  }

  return (
    <>
      <div className='container mx-[5rem]'>
          <div className='flex md:flex-row'>
              <div className='bg-[#2c2c2c] p-3 mt-2 mb-2 text-white'>
                  <h2 className='text-center text-black py-2 rounded-full mb-2 bg-gray-100 hover:bg-gray-200 cursor-pointer'>
                     Filter By Category
                  </h2>
                  <div className='p-5 w-[15rem]'>
                     {
                        categories?.map((category) => (
                           <div key={category._id} className='mb-2'>
                              <div className='flex items-center mr-4'>
                                    <input 
                                       type='checkbox' 
                                       id='checkbox' 
                                       onChange={e => handleCheck(e.target.checked, category._id)}
                                       className='w-4 h-4 text-[#d81b60] bg-gray-100 border-gray-300
                                       rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800
                                       focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                     />
                                     <label 
                                        htmlFor='checkbox' 
                                        className='ml-2 text-sm font-medium dark:text-gray-300'
                                     >
                                       {category?.name}
                                     </label>
                              </div>
                           </div>
                        ))
                     }
                  </div>
                  <h2 className='text-center text-black py-2 rounded-full mb-2 bg-gray-100 hover:bg-gray-200 cursor-pointer'>
                     Filter By Brand
                  </h2>
                  <div className='p-5'>
                     {
                        uniqueBrands?.map((brand) => (
                           <>
                             <div className='flex items-center mr-4 mb-2'>
                                <input 
                                  type='radio' 
                                  id={brand} 
                                  name='brand' 
                                  onChange={() => handleBrandClick(brand)}
                                  className='w-4 h-4 text-[#d81b60] bg-gray-100 border-gray-300
                                  rounded-full focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800
                                  focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                />
                                <label 
                                 htmlFor='radio'
                                 className='ml-2 text-sm font-medium dark:text-gray-300'
                                >
                                  {brand}
                                </label>
                             </div>
                           </>
                        ))
                     }
                  </div>
                  <h2 className=' text-center text-black py-2 bg-gray-100 hover:bg-gray-200 rounded-full mb-2 cursor-pointer'>
                     Filter By Price
                  </h2>
                  <div className='p-4 w-[15rem]'>
                     <input 
                        type='text' 
                        placeholder='Enter Price' 
                        value={priceFilter} 
                        onChange={handlePriceChange}
                        className='w-full px-3 py-2 border rounded-lg
                        focus:outline-none focus:ring'
                      />
                  </div>
                  <div className='p-1 pt-0'>
                      <button 
                       className='w-full border my-4 bg-gray-100 rounded-full text-black py-2 cursor-pointer'
                       onClick={() => window.location.reload()}
                      >
                         Reset
                      </button>
                  </div>
              </div>
              <div className='p-3'>
                <h2 className='text-center mb-2 font-semibold text-lg'>{products?.length} Products</h2>
                <div className='flex flex-wrap'>
                    {
                     products.length === 0 
                     ?
                     (
                        <Loader/>
                     )
                     :
                     (
                        products?.map((product) => (
                           <div className='p-3' key={product._id}>
                              <ProductCard product={product}/>
                           </div>
                        ))
                     )
                    }
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Shop
import React from 'react'
import { useSelector } from 'react-redux'
import { selectFavoriteProduct } from '../../../../redux/features/favorites/favoriteSlice'
import Product from '../product'

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct)
  console.log(favorites)

  return (
    <div className='ml-[9rem]'>
       <h1 className='text-lg font-semibold ml-[3rem] mt-[2rem]'>
           FAVORITE <span className='text-[#d81b60]'>PRODUCTS.</span>
       </h1>
       {
        favorites.length > 0 ? 
        (
          <div className='flex flex-wrap'>
              {
                favorites.map((product) => (
                  <Product key={product._id} product={product}/>
                ))
              }
          </div>
        )
        :
        (
          <div className='ml-[3rem] mt-[1rem] w-[34rem] h-[8rem] flex items-center justify-center bg-white rounded-lg shadow'>
            <p className='font-semibold text-neutral-900'>Your favorites box is empty </p>
          </div>
        )
       }
    </div>
  )
}

export default Favorites
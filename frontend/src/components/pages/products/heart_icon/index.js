import React, {useEffect} from 'react'
import {
  FaHeart, 
  FaRegHeart
} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { 
  addToFavorite, 
  addToFavorites, 
  removeFromFavorites, 
  setFavorites 
} from '../../../../redux/features/favorites/favoriteSlice'
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage
} from '../../../../utilities/localStorage.js'

const HeartIcon = ({product}) => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites) || []
  const isFavorite = favorites.some((p) => p._id === product._id)

  useEffect(() => {
     const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
     dispatch(setFavorites(favoritesFromLocalStorage))
  },[])

  const toggleFavorites = () => {
    if(isFavorite){
       dispatch(removeFromFavorites(product))
       // remove the product from the localStorage
       removeFavoriteFromLocalStorage(product._id)
    }
    else{
       dispatch(addToFavorites(product))
       // add the product to localStorage
       addFavoriteToLocalStorage(product)
    }
  }

  return (
    <div 
     onClick={toggleFavorites}
     className='absolute top-2 right-10 cursor-pointer'>
       {
        isFavorite
        ?
        (
         <FaHeart className='text-[#d81b60]' size={20}/>
        )
        :
        (
         <FaRegHeart className='text-gray-600' size={20}/>
        )
       }
    </div>
  )
}

export default HeartIcon
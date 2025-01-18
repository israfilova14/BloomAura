import React from 'react'
import { Link } from 'react-router'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import {addToCart} from '../../../../redux/features/cart/cartSlice.js'
import { toast } from 'react-toastify'
import HeartIcon from '../heart_icon/index.js'

const ProductCard = ({product}) => {
  const dispatch = useDispatch()

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({...product, qty}))
    toast.success('Item added successfully')
  }

  return (
    <div className='max-w-sm relative rounded-lg shadow w-[350px] h-full bg-white p-2'>
       <section className='relative '>
       
        <Link 
             to={`/product/${product._id}`}
            
           >
             <span 
              className='absolute bottom-3 right-3 bg-pink-200 text-pink-800 text-sm font-medium mr-2 
              px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300'
              >
                 {product?.brand}
              </span>
              <img 
                className='cursor-pointer w-full object-cover p-1 mix-blend-multiply'
                src={product?.image} 
                alt={product?.name}
                style={{objectFit:'cover', height: '220px', width: '200px'}}
              />
              <HeartIcon product={product}/>
           </Link>
     
       </section>
       <div>
           <div className='flex justify-between'>
               <h5 className='mb-2 text-base'>{product?.name}</h5>
               <p className='text-black font-semibold'>
                  {
                    product?.price?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })
                  }
               </p>
           </div>
           <p className='mb-1 text-neutral-600'>
              {product?.description.substring(0, 60)}...
           </p>
           <section className='flex justify-between items-center'>
              <Link 
                to={`/product/${product._id}`}
                className='inline-flex items-center px-3 py-2 text-sm rounded font-medium text-center text-white 
                bg-[#d81b60] hover:bg-[#c2185b] focus:ring-3 focus:outline-none focus:ring-pink-300
                dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
              >
                 Read More
              </Link>
              <button 
              onClick={() => addToCartHandler(product, 1)}
              className='p-2 rounded-full'>
                 <AiOutlineShoppingCart size={21}/>
              </button>
           </section>
       </div>
    </div>
  )
}

export default ProductCard
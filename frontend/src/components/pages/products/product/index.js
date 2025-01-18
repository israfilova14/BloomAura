import React from 'react'
import { Link } from 'react-router'
import HeartIcon from '../heart_icon'

const Product = ({product}) => {
  return (
    <div className='w-[25rem] ml-[2rem] p-3 relative'>
       <div className='relative'>
          <img 
           src={product.image} 
           alt={product.name}
           className='w-[22rem] h-[22rem] rounded'
          />
          <HeartIcon product={product}/>
       </div>
       <div className='p-2'>
         <Link to={`/product/${product._id}`}>
            <h2 className='flex justify-between items-center'>
               <div className='text-lg'>
                  {product.name}
               </div>
               <span 
                 className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 
                 rounded-full dark:bg-blue-900 dark:text-blue-300'
               >
                   
                   ${product.price}
               </span>
            </h2>
         </Link>
       </div>
    </div>
  )
}

export default Product
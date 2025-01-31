import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from '../heart_icon'

const SmallProduct = ({product}) => {
  return (
    <div className='w-[20rem] ml-[2rem] p-3'>
        <div className='relative'>
            <img 
              src={product?.image} 
              alt={product?.name}
              className='h-[18rem] w-[16.5rem] rounded'
             />
             <HeartIcon product={product}/>
             <div className='p-5'>
                 <Link to={`/product/${product._id}`}>
                    <h2 className='flex justify-between items-center'>
                         <div>{product?.name}</div>
                         <span 
                            className='bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full
                            dark:bg-blue-900 dark:text-blue-300'
                          >
                            ${product?.price}
                         </span>
                    </h2>
                 </Link>
             </div>
        </div>
    </div>
  )
}

export default SmallProduct
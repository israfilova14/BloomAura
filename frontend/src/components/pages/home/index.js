import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCurrentProductsQuery } from '../../../redux/api/productApiSlice'
import Loader from '../../helpers/loader'
import Header from '../../layout/header'
import Message from '../../helpers/message'
import Product from '../products/product'

const Home = () => {
  const {keyword} = useParams()
  const {data, isLoading, isError} = useCurrentProductsQuery({keyword})
  console.log("current products", data)

  return (
    <div>
       {
        !keyword 
         ? 
         <Header/> 
         : 
         null
       }
       {
        isLoading ? (<Loader/>) : isError ? (<Message variant='danger'>
          {isError?.data?.message || isError.error}
        </Message>) : (
          <>
           <div className='flex justify-between items-center'>
              <h1 className='ml-[20rem] mt-[6rem] text-2xl font-semibold'>
                    Special Products
              </h1>
              <Link 
                to='/shop' 
                className='bg-[#d81b60] hover:bg-[#c2185b] text-white font-bold rounded-full py-2 px-10 mr-[18rem] mt-[6rem]'
              >
                 Shop
              </Link>
           </div>
           <div className='flex flex-wrap mt-[2rem] ml-[9rem]'>
              {
                data.products.map((product) => (
                  <div key={product._id} >
                     <Product product={product}/>
                  </div>
                ))
              }
           </div>
          </>
        )
       }
    </div>
  )
}

export default Home
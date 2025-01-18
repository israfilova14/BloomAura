import React from 'react'
import { useTopProductsQuery } from '../../../redux/api/productApiSlice'
import Loader from '../../helpers/loader'
import SmallProduct from '../../pages/products/small_product'
import ProductCarusel from '../../pages/products/product_carousel'

const Header = () => {
  const {data, isLoading, error} = useTopProductsQuery()
  console.log("top products", data)

  if(isLoading){
    return <Loader/>
  }
  
  if(error){
    return <h1>Error</h1>
  }

  return (
    <>
      <div className='ml-[9rem]'>
         <h2 className='text-2xl font-semibold'>Bloom <span className='text-[#d81b60]'>Aura.</span></h2>
      </div>
      <div className='flex gap-[6rem] ml-[4rem]'>
         <div className='xl:block lg:hidden md:hidden sm:hidden'>
            <div className='grid grid-cols-2'>
               {
                 data.map((product) => (
                  <div key={product?._id}>
                     <SmallProduct product={product}/>
                  </div>
                 ))
               }
            </div>
         </div>
         <ProductCarusel/>
      </div>
    </>
  )
}

export default Header
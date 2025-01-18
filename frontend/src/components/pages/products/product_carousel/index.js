// import React from 'react'
// import { useGetProductByIdQuery, useTopProductsQuery } from '../../../../redux/api/productApiSlice'
// import Message from '../../../helpers/message'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import moment from 'moment'

// import { Slide } from 'react-toastify'

// const ProductCarusel = () => {
//   const {data: products, isLoading, error} = useTopProductsQuery()

//   const settings = {
//      dots: false,
//      infinity: true,
//      speed: 500,
//      slidesToShow: 1,
//      slidesToScroll: 1,
//      arrows: true,
//      autoplay: true,
//      autoplaySpeed: 3000
//   }

//   return (
//     <div className='mb-4 xl:block lg:block md:block'>
//        {
//         isLoading ?
//         null:
//         error?
//         (
//           <Message variant='danger'>
//                {error?.data?.message}
//           </Message>
//         ):
//         (
//           <Slider 
//            {...settings} 
//            className='xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block'
//            >
//              {
//               products.map((
//                 {
//                   image, 
//                   _id, 
//                   name, 
//                   price, 
//                   description, 
//                   brand, 
//                   createdAt, 
//                   numReviews, 
//                   rating, 
//                   quantity, 
//                   countInStock
//                 }) => 
//                 (
//                   <div key={_id}>
//                     <img src={image} alt={name} className='w-full rounded-lg object-scale-down h-[50rem]'/>
//                   </div>
//                 ))
//              }
//           </Slider>
//         )

//        }
//     </div>
//   )
// }

// export default ProductCarusel
import React from 'react';
import { useTopProductsQuery } from '../../../../redux/api/productApiSlice';
import Message from '../../../helpers/message';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaSpinner
} from 'react-icons/fa'
import moment from 'moment'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="text-4xl animate-spin text-green-500" />
        </div>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || 'Something went wrong!'}</Message>
      ) : (
        <Slider {...settings} className="w-full max-w-[50rem] mx-auto">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4">
                <img
                  src={image}
                  alt={name}
                  className="w-[46rem] h-[40rem] object-coverrounded-lg shadow-md"
                />
                <div className="flex justify-between w-[20rem]">
                   <div className='one'>
                      <h2>{name}</h2>
                      <p>${price}</p><br/>
                      <p className='w-[25rem]'>
                         {description.substring(0, 180)}
                      </p>
                   </div>
                   <div className='flex justify-between w-[20rem]'>
                       <div className='three'>
                           <h1 className='flex items-center mb-6 w-[15rem]'>
                              <FaStore className='mr-2 text-blue-400' size={19}/>Brand: {brand}
                           </h1>
                           <h1 className='flex items-center mb-6 w-[15rem]'>
                              <FaClock className='mr-2 text-blue-400' size={19}/>Added: {moment(createdAt).fromNow()}
                           </h1>
                           <h1 className='flex items-center mb-6 w-[15rem]'>
                              <FaStar className='mr-2 text-blue-400' size={19}/>Reviews: {numReviews}
                           </h1>
                       </div>
                       <div className='four'>
                          <div className='flex items-center mb-6 w-[8rem]'>
                              <FaStar className='mr-2 text-blue-400' size={19}/>Ratings:{""}
                              {Math.round(rating)}
                          </div>
                          <div className='flex items-center mb-6 w-[8rem]'>
                              <FaShoppingCart className='mr-2 text-blue-400' size={19}/>Quantity:{""}
                              {quantity}
                          </div>
                          <div className='flex items-center mb-6 w-[8rem]'>
                              <FaBox className='mr-2 text-blue-400' size={18}/>In Stock:{""}
                              {countInStock}
                          </div>
                       </div>
                   </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;

import React, {useState} from 'react'
import { useParams, 
         Link, 
         useNavigate 
        } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGetProductDetailsQuery, 
         useProductReviewMutation 
       } from '../../../../redux/api/productApiSlice'
import Loader from '../../../helpers/loader'
import Message from '../../../helpers/message'
import { FaBox, 
         FaClock, 
         FaShoppingCart, 
         FaStar, 
         FaStore 
       } from 'react-icons/fa'
import moment from 'moment'
import HeartIcon from '../heart_icon'
import Ratings from '../ratings'
import ProductTabs from '../product_tabs'
import { addToCart } from '../../../../redux/features/cart/cartSlice'

const ProductDetails = () => {
  const {id: productId} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const {
         data: product, 
         isLoading,
         error,
         refetch
        } = useGetProductDetailsQuery(productId)

  const {userInfo} = useSelector(state => state.auth)
  const [createReview, {isLoading: loadingProductReview}] = useProductReviewMutation()

  const submitHandler = async (e) => {
       e.preventDefault()

       try{
           await createReview({
             productId, rating, comment
           }).unwrap()
           refetch()
           toast.success('Review created successfully')
       }
       catch(error){
           toast.error("Product already reviewed" || error?.message)
       }
  }

  const addToCartHandler = () => {
      dispatch(addToCart({...product, qty}))
      navigate('/cart')
  }
  return (
      <>
        <div>
          <Link 
            to='/' 
            className='font-semibold text-lg  hover:underline ml-[10rem] text-[#d81b60]'
          >
            Go To Home
          </Link>
        </div>

        {
          isLoading 
           ? 
          <Loader/>
           : 
           error 
           ? 
          <Message variant='danger'>{error?.data?.message || error?.message}</Message>
           :
          <>
            <div className='flex flex-wrap relative items-between mt-[2rem] ml-[10rem]'>
               <div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className='w-full h-[27rem] xl:w-[45rem] lg:w-[40rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]'
                  />
                  <HeartIcon product={product}/>
               </div>
               <div className='flex flex-col gap-1'>
                   <h2 className='text-2xl font-semibold'>
                       {product.name}
                   </h2>
                   <p className='xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-base'>
                        Description: {product.description}
                   </p>
                   <p className='text-lg font-semibold'>
                        Price: ${product.price}
                   </p>
                   <div className='flex items-center justify-between w-[20rem]'>
                      <div className='one'>
                         <h1 className='flex items-center mb-6'>
                            <FaStore className='mr-2 text-blue-400' size={20}/>{" "}
                             Brand: {product.brand}
                         </h1>
                         <h1 className='flex items-center mb-6'>
                            <FaClock className='mr-2 text-blue-400' size={20}/>{" "}
                              Added: {moment(product.createdAt).fromNow()}
                         </h1>
                         <h1 className='flex items-center mb-6'>
                            <FaStar className='mr-2 text-blue-400' size={20}/>{" "}
                              Reviews: {product.numReviews}
                         </h1>
                      </div>
                      <div className='two'>
                         <h1 className='flex items-center mb-6'>
                            <FaStar className='mr-2 text-blue-400' size={20}/>Ratings: {rating}
                         </h1>
                         <h1 className='flex items-center mb-6'>
                            <FaShoppingCart className='mr-2 text-blue-400' size={20}/>Quantity: {product.quantity}
                         </h1>
                         <h1 className='flex items-center mb-6'>
                            <FaBox className='mr-2 text-blue-400' size={19}/>In Stock: {product.countInStock}
                         </h1>
                      </div>
                   </div>
                   <div className='flex justify-between flex-wrap'>
                      <Ratings 
                        value={product.rating} 
                        text={`${product.numReviews} reviews`}
                      />
                      {
                        product.countInStock > 0 && (
                          <div>
                             <select 
                               value={qty} 
                               onChange={e => setQty(e.target.value)}
                               className='p-2 w-[6rem] rounded-lg'
                             >
                               {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                               ))}
                             </select>
                          </div>
                        )
                      }
                   </div>
                   <div className='btn-container'>
                      <button 
                        onClick={addToCartHandler }
                        disabled={product.countInStock === 0}
                        className='bg-[#d81b60] hover:bg-[#c2185b] text-white py-2 px-4 rounded-lg mt-4 md:mt-0'
                      >
                        Add To Cart
                      </button>
                   </div>
               </div>
               <div 
                 className='mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]'
               >
                  <ProductTabs 
                     loadingProductReview={loadingProductReview} 
                     userInfo={userInfo}
                     submitHandler={submitHandler}
                     rating={rating}
                     setRating={setRating}
                     comment={comment}
                     setComment={setComment}
                     product={product}
                  />
               </div>
            </div>
          </>
          }
      </>
  )
}

export default ProductDetails
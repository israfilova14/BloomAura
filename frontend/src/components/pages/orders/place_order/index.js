import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../helpers/message'
import ProgressSteps from '../../../helpers/progress_steps'
import { useCreateOrderMutation } from '../../../../redux/api/orderApiSlice' 
import { clearCartItems } from '../../../../redux/features/cart/cartSlice'
import Loader from '../../../helpers/loader'

const PlaseOrder = () => {
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  console.log(cart)
  const [createOrder, {isLoading, error}] = useCreateOrderMutation()

  useEffect(() => {
     if(!cart.shippingAddress.address){
         navigate('/shipping')
     }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const dispatch = useDispatch()

  const placeOrderHandler = async() => {
      try{
          const response = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
          }).unwrap()
          dispatch(clearCartItems())
          navigate(`/order/${response._id}`)
      }
      catch(error){
         toast.error(error)
      }
  }

  return (
    <>
      <ProgressSteps step1 step2 step3/>
      <div className='container mx-[6rem] mt-4'>
          { 
            cart.cartItems.length === 0 
            ? 
            (
              <Message>Your cart is empty</Message>
            )
            :
            (
              <div className='overflow-x-auto'>
                  <table className='w-[70%] border-collapse'>
                      <thead>
                         <tr>
                           <td className='px-1 py-2 text-left align-top border border-[#404040]'>Image</td>
                           <td className='px-1 py-2 text-left border border-[#404040]'>Product</td>
                           <td className='px-1 py-2 text-left border border-[#404040]'>Quantity</td>
                           <td className='px-1 py-2 text-left border border-[#404040]'>Price</td>
                           <td className='px-1 py-2 text-left border border-[#404040]'>Total</td>
                         </tr>
                      </thead>
                      <tbody>
                          {
                            cart.cartItems.map((item, index) => (
                              <tr key={index}>
                                  <td className='p-2 border border-[#404040]'> 
                                     <img src={item?.image} alt={item.name} className='w-20 h-20 object-cover'/>
                                  </td>
                                  <td className='p-2 border border-[#404040]'>
                                     <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                                  </td>
                                  <td className='p-2 border border-[#404040]'>
                                      {item?.qty}
                                  </td>
                                  <td className='p-2 border border-[#404040]'>
                                       ${item.price.toFixed(2)}
                                  </td>
                                  <td className='p-2 border border-[#404040]'>
                                       ${(item.qty * item.price).toFixed(2)}
                                  </td>
                              </tr>
                            ))
                          }
                      </tbody>
                  </table>
                  <div className='mt-8'>
                      <h2 className='text-lg font-semibold mb-2'>Order Summary</h2>
                      <div className='flex justify-between flex-wrap p-5 bg-[white] w-[70%] rounded-md'>
                        <ul className='text-md'>
                           <li>
                             <span className='font-medium mb-1'>Items:</span>{"   "}{cart?.cartItems[0]?.qty}
                           </li>
                           <li>
                             <span className='font-medium mb-1'>Shipping:</span>{"   "}${cart?.shippingPrice}
                           </li>
                           <li>
                             <span className='font-medium mb-1'>Tax:</span>{"   "}${cart?.taxPrice}
                           </li>
                           <li>
                             <span className='font-medium mb-1'>Total:</span>{"   "}${cart?.totalPrice}
                           </li>
                        </ul>
                        {
                          error && <Message variant='danger'>{error?.data?.message}</Message>
                        }
                        <div>
                           <h2 className='text-lg mb-1'>Shipping</h2>
                           <p>
                             <strong>Address:</strong>{" "}
                             {cart.shippingAddress.address}{" "}
                             {cart.shippingAddress.city}{" "},
                             {cart.shippingAddress.postalCode}{" "},
                             {cart.shippingAddress.country}
                           </p>
                        </div>
                        <div>
                           <h2 className='text-lg mb-1'>Payment Method</h2>
                           <strong>Method:</strong>
                           {cart.paymentMethod}
                        </div>
                      </div>
                      <button 
                        type='button' 
                        className='bg-[#d81b60] hover:bg-[#c2185b] text-white py-2 px-4 rounded text-md w-[30rem] mt-4' 
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                      >
                         Plase Order
                      </button>
                      {
                        isLoading && <Loader/>
                      }
                  </div>
              </div>
            )
          }
      </div>
    </>
  )
}

export default PlaseOrder
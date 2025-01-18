import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../../../helpers/message/index.js'
import Loader from '../../../helpers/loader'
import {
           useDeliverOrderMutation,
           useFindOrderQuery,
           useGetPaypalClientIdQuery,
           usePayOrderMutation
       } from '../../../../redux/api/orderApiSlice.js'

const Order = () => {
  const {id: orderId}  = useParams()
  const {userInfo} = useSelector((state) => state.auth)

  const {data:order, refetch, isLoading, error} = useFindOrderQuery(orderId)
  const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation()
  const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation()
  const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
  const {
           data:paypal, 
           isLoading: loadingPayPal, 
           error: errorPayPal
         } = useGetPaypalClientIdQuery()

  useEffect(() => {
     if(!errorPayPal && !loadingPay && paypal?.clientId){
        const loadingPayPalScript = async() => {
           paypalDispatch({
              type: 'resetOptions',
              value: {
                 "client-id": paypal.clientId,
                 currency: 'USD',
              }
           })
           paypalDispatch({type: 'setLoadingStatus', value: 'pending'})
        }

        if(order && !order.isPaid){
             if(!window.paypal){
                  loadingPayPalScript()
             }
        }
     }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch])

  function onApprove(data, actions) {
      return actions.order.capture().then(async function(details){
          try{
              await payOrder({orderId, details})
              refetch()
              toast.success("Order is paid")
          }catch(error){
             toast.error(error?.data?.message || error.message)
          }
      })
  }

  function createOrder(data, actions) {
     return actions.order.create({
        purchase_units: [{amount: {value: order.totalPrice}}]
     }).then((orderId) => {
        return orderId
     })
  }

   function onError(error){
       toast.error(error.message)
   }

   const deliverHandler = async() => {
       await deliverOrder(orderId)
       refetch()
   }

   return (
    isLoading 
    ? 
    (<Loader/>)
    :
    error
    ?
    (<Message variant='danger'></Message>)
    :
    <div className='container flex flex-col ml-[5rem] md:flex-row w-[90%]'>
        <div className='md:w-2/3 pr-4'>
            <div className='p-5 pb-4 mb-5'>
               {
                 order.orderItems.length === 0 
                 ? 
                 (
                   <Message>Order is empty</Message>
                 )
                 :
                 (
                  <div className='overflow-x-auto'>
                     <table className='w-[80%] bg-white'>
                           <thead>
                              <tr>
                                 <th className='p-2 border border-[#2c2c2c] font-semibold'>Image</th>
                                 <th className='p-2 border border-[#2c2c2c] font-semibold'>Product</th>
                                 <th className='p-2 border border-[#2c2c2c] font-semibold'>Quantity</th>
                                 <th className='p-2 border border-[#2c2c2c] font-semibold'>Unit Price</th>
                                 <th className='p-2 border border-[#2c2c2c] font-semibold'>Total</th>
                              </tr>
                           </thead>

                           <tbody>
                               {order.orderItems.map((item, index) => (
                                  <tr key={index}>
                                       <td className='p-2 border border-[#2c2c2c]'>
                                          <img src={item.image} alt={item.name} className='w-32 h-32 ml-[1rem] object-scale-down'/>
                                       </td>
                                       <td className='p-2  border border-[#2c2c2c] text-center'>
                                           <Link to={`/product/${item.product}`}>
                                               {item.name}
                                           </Link>
                                       </td>
                                       <td className='p-2 border border-[#2c2c2c] text-center'>
                                           {item.qty}
                                       </td>
                                       <td className='p-2 border border-[#2c2c2c] text-center'>
                                            ${item.price}
                                       </td>
                                       <td className='p-2 border border-[#2c2c2c] text-center'>
                                            ${(item.qty * item.price).toFixed(2)}
                                       </td>
                                  </tr>
                               ))}
                           </tbody>
                     </table>
                  </div>
                 )
               }
            </div>
        </div>
        <div className='md:w-1/3'>
           <div className='mt-5 pb-4 mb-4'>
               <h2 className='text-xl font-semibold mb-2'>Shipping</h2>
               <p className='mb-4 mt-4'>
                  <strong className='text-[#d81b60]'>Order:</strong> {order._id}
               </p>
               <p className='mb-4'>
                   <strong className='text-[#d81b60]'>Name:</strong> {order?.user?.username}
               </p>
               <p className='mb-4'>
                   <strong className='text-[#d81b60]'>Email:</strong> {order?.user?.email}
               </p>
               
               <div className='mb-4'>
                  <strong className='text-[#d81b60]'>Address:</strong> 
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
               </div>

               <p className='mb-4'>
                   <strong className='text-[#d81b60]'>Method:</strong> {order?.paymentMethod}
               </p>

               {
                order.isPaid 
                  ?
                  (
                      <Message variant='success'>
                        Paid on: {order.paidAt}
                      </Message>
                  )
                  :
                  (
                      <div className='bg-blue-400 p-3 rounded text-white'>
                         Not Paid
                      </div>
                  )
              }
           </div>
           <h2 className='text-xl font-semibold mb-2 mt-[2rem]'>Order Summary</h2>
           <div className='flex justify-between mb-2'>
              <span>Items</span>
              <span>${order.itemsPrice}</span>
           </div>
           <div className='flex justify-between mb-2'>
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
           </div>
           <div className='flex justify-between mb-2'>
              <span>Tax</span>
              <span>${order.taxPrice}</span>
           </div>
           <div className='flex justify-between mb-2'>
              <span>Total</span>
              <span>${order.totalPrice}</span>
           </div>
           {
            !order.isPaid && (
               <div>
                  {loadingPayPal && <Loader/>}
                  {
                      isPending 
                        ? 
                      (<Loader/>) 
                        :
                      (
                        <div>
                           <div>
                              <PayPalButtons 
                               createOrder={createOrder}
                               onApprove={onApprove}
                               onError={onError}
                              >

                              </PayPalButtons>
                           </div>
                        </div>
                      )
                  }
               </div>
              )
           }
           {loadingDeliver && <Loader/>}
           {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
             <div>
                <button type='button' className='bg-[] text-white w-full py-2' onClick={deliverHandler}>
                    Mark As Delivered
                </button>
             </div>
           )} 
        </div>
    </div>
  )
}

export default Order
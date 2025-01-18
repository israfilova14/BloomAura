import React from 'react'
import Message from '../../../helpers/message'
import Loader from '../../../helpers/loader'
import { Link } from 'react-router-dom'
import { useAllOrdersQuery } from '../../../../redux/api/orderApiSlice'
import AdminMenu from '../admin_menu/index.js'

const OrderList = () => {
  const {data: orders, isLoading, error} = useAllOrdersQuery()

  return (
    <div className='ml-[6rem]'>
      {
        isLoading 
           ? 
        (<Loader/>) 
           : 
         error 
           ? 
        (<Message variant='danger'>{error?.data?.message || error.error}</Message>)
           :
        (
           <>
            <h2 className='mb-[1rem] mt-[1rem] text-2xl font-semibold'>Order <span className='text-[#d81b60]'>Management.</span></h2>
            <AdminMenu/>
            <table className='container w-[80%] bg-white'>
               <thead className=''>
                  <tr className='mb-[5rem]'>
                      <th className='text-center font-medium border border-[#2c2c2c] p-2'>Item</th>
                      <th className='text-center font-medium border border-[#2c2c2c]'>Id</th>
                      <th className='text-center font-medium border border-[#2c2c2c]'>User</th>
                      <th className='text-center font-medium border border-[#2c2c2c]'>Data</th>
                      <th className='text-center font-medium border border-[#2c2c2c]'>Total</th>
                      <th className='text-center font-medium border border-[#2c2c2c]'>Paid</th>
                      <th className='text-center font-medium border border-[#2c2c2c]'>Delivered</th>
                      <th className='text-center font-medium border border-[#2c2c2c]'>Details</th>
                  </tr>
               </thead>
               <tbody>
                   {
                    orders.map((order) => (
                      <tr key={order._id}>
                          <td className='border border-[#2c2c2c]'>
                             <img 
                               src={order?.orderItems[0]?.image} 
                               className='w-[120px] h-[120px] pt-2 pb-2 ml-[2rem] mix-blend-multiply'
                               alt={order._id}
                              />
                          </td>
                          <td className='text-center border border-[#2c2c2c]'>{order?._id}</td>
                          <td className='text-center border border-[#2c2c2c]'>{order.user ? order.user.username : 'N/A'}</td>
                          <td className='text-center border border-[#2c2c2c]'>{order?.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td>
                          <td className='text-center border border-[#2c2c2c]'>${order.totalPrice}</td>
                          <td className='border border-[#2c2c2c]'>
                            {
                              order.isPaid 
                                ? 
                              (<p className='p-1 text-center bg-green-400 hover:bg-green-500 w-[6rem] rounded-full mx-auto'>
                                Completed
                              </p>) 
                                : 
                              (<p className='p-1 text-center bg-red-500 hover:bg-red-600 w-[6rem] rounded-full text-white mx-auto'>
                                 Pending
                              </p>)
                            }
                         </td>
                         <td className='border border-[#2c2c2c]'>
                         {
                              order.isDelivered
                                ? 
                              (<p className='p-1 text-center bg-green-500 hover:bg-green-600 w-[6rem] rounded-full mx-auto'>
                                Completed
                              </p>) 
                                : 
                              (<p className='p-1 text-center bg-red-500 hover:bg-red-600 w-[6rem] rounded-full text-white mx-auto'>
                                 Pending
                              </p>)
                            }
                         </td>
                         <td className='border border-[#2c2c2c] p-1'>
                            <Link to={`/order/${order._id}`}>
                               <p className='px-4 py-2 rounded-full text-white text-center bg-green-500 hover:bg-green-600 mx-auto '>
                                   More
                               </p>
                            </Link>
                         </td>
                      </tr>
                    ))
                   }
               </tbody>
            </table>
          </>
        )
      }
    </div>
  )
}

export default OrderList
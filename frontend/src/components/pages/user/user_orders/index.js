import React from 'react'
import Message from '../../../helpers/message'
import Loader from '../../../helpers/loader'
import { Link } from 'react-router-dom'
import { useUserOrdersQuery } from '../../../../redux/api/orderApiSlice'

const UserOrders = () => {
  const {data: orders, isLoading, error} = useUserOrdersQuery()
  console.log(orders)
  return (
    <div className='container ml-[6rem]'>
       <h2 className='text-2xl font-semibold mb-4'>
            Your <span className='text-[#d81b60]'>Orders.</span>
       </h2>
       {
          isLoading
            ? 
          (<Loader/>) 
            : 
            error 
            ? 
           (<Message variant='danger'> {error?.data?.error || error?.error}</Message>)
            :
            (<table className='w-[80%] bg-white'>
                <thead>
                    <th className='py-2 border border-[#2c2c2c] font-medium'>Image</th>
                    <th className='py-2 border border-[#2c2c2c] font-medium'>Id</th>
                    <th className='py-2 border border-[#2c2c2c] font-medium'>Date</th>
                    <th className='py-2 border border-[#2c2c2c] font-medium'>Total</th>
                    <th className='py-2 border border-[#2c2c2c] font-medium'>Paid</th>
                    <th className='py-2 border border-[#2c2c2c] font-medium'>Delivered</th>
                    <th className='py-2 border border-[#2c2c2c] font-medium'>Details</th>
                </thead>
                <tbody>
                   {
                    orders.map((order) => (
                      <tr key={order?._id}>
                         <td className='border border-[#2c2c2c]'>
                            <img 
                                src={order?.orderItems[0]?.image} 
                                alt={order.user} 
                                className='h-[120px] w-[120px] mb-5 ml-[3rem] mt-[1rem]'
                              />
                         </td>
                         <td className='border border-[#2c2c2c] text-center'>{order?._id}</td>
                         <td className='border border-[#2c2c2c] text-center'>{order?.createdAt.substring(0, 10)}</td>
                         <td className='border border-[#2c2c2c] text-center'>${order?.totalPrice}</td>
                         <td className='py-2 border border-[#2c2c2c]'>
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
                         <td className='px-2 py-2 border border-[#2c2c2c]'>
                            <Link to={`/order/${order._id}`}>
                               <p className='bg-pink-500 hover:bg-pink-600 py-2 px-3 w-36 rounded-full text-white text-center mx-auto'>
                                View Details
                               </p>
                            </Link>
                         </td>
                      </tr>
                    ))
                   }
                </tbody>
            </table>)
        }
    </div>
  )
}

export default UserOrders
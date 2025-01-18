import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import {
        addToCart, 
        removeFromCart
       } from '../../../redux/features/cart/cartSlice.js'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart
  
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({...product, qty}))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/sign-in?redirect=/shipping')
  }
  return (
    <>
      <div className='container flex justify-around items-start flex-wrap mx-auto mt-8'>
          {cartItems.length === 0 
            ? 
            (
             <div className='bg-white p-6 w-[50rem] rounded-lg font-semibold flex items-center justify-center gap-2'>
              Your cart is empty  <Link to='/shop' className='text-[#d81b60]'>Go To Shop</Link>
             </div>
            ) 
            : 
            (
              <>
               <div className='flex flex-col w-[80%]'>
                  <h1 className='text-2xl font-semibold mb-4'>Shopping <span className='text-[#d81b60]'>Cart</span></h1>
                  {
                    cartItems.map((item) => (
                      <div key={item._id} className='flex items-center mb-[1rem] pb-2 bg-white w-[60rem] p-3 rounded'>
                         <div className='w-[10rem] h-[10rem]'>
                             <img 
                              src={item?.image} 
                              alt={item?.name} 
                              className='w-full h-full object-cover rounded mix-blend-multiply'
                             />
                         </div>
                         <div className='flex-1 ml-4'>
                            <Link to={`/product/${item._id}`} className='text-[17px] text-[#d81b60]'>
                               {item.name}
                            </Link>
                            <div className='mt-2'>{item?.brand}</div>
                            <div className='mt-2 font-bold'>${item?.price}</div>
                         </div>
                         <div className='w-24'>
                            <select 
                              className='w-full p-1 border rounded' 
                              value={item.qty}
                              onChange={e => addToCartHandler(item, Number(e.target.value))}
                            >
                                {[...Array(item.countInStock).keys()].map((x) => (
                                  <option value={x + 1} key={x + 1}>
                                     {x + 1}
                                  </option>
                                ))}
                            </select>
                         </div>
                         <div>
                           <button 
                              className='text mr-[5rem] text-[#e53935]' 
                              size={21}
                              onClick={() => removeFromCartHandler(item._id)}
                           >
                               <FaTrash className='ml-[1rem] mt-[1rem]'/>
                           </button>
                         </div>
                      </div>
                    ))
                  }
                  <div className='mt-8 w-[40rem]'>
                     <div className='p-4 rounded-lg'>
                        <h2 className='text-lg font-semibold mb-2'>
                          Items: <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                        </h2>
                        <div className='text-lg font-semibold'>
                           Price: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                        <button 
                          className='bg-[#d81b60] mt-4 py-2 px-4 rounded-full w-full text-white'
                          disabled={cartItems.length === 0}
                          onClick={checkoutHandler}
                        >
                          Proceed To Checkout
                        </button>
                     </div>
                  </div>
               </div>
              </>
            )
            }
      </div>
    </>
  )
}

export default Cart
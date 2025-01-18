import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
        saveShippingAddress,
        savePaymentMethod
       } from '../../../../redux/features/cart/cartSlice.js'
import ProgressSteps from '../../../helpers/progress_steps/index.js'


const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart

  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
     e.preventDefault()
     dispatch(saveShippingAddress({address, city, postalCode, country}))
     dispatch(savePaymentMethod(paymentMethod))
     navigate('/placeorder')
  }

  // Payment
  useEffect(() => {
      if(!shippingAddress.address){
         navigate('/shipping')
      }
  }, [navigate, shippingAddress])

  return (
    <div className='container mx-auto mt-[2rem]'>
        <ProgressSteps step1 step2/>
        <div className='mt-[4rem] flex justify-around items-center flex-wrap'>
              <form 
                onSubmit={submitHandler}
                className='w-[40rem]'
              >
                   <h1 className='text-2xl font-semibold'>
                       Shipping
                   </h1>
                   <div className='mb-4'>
                       <label className='block mb-2'>Address</label>
                       <input 
                          type='text' 
                          className='w-full p-2 border rounded' 
                          placeholder='Please enter address...'
                          value={address}
                          required
                          onChange={(e) => setAddress(e.target.value)}
                       />
                   </div>
                   <div className='mb-4'>
                       <label className='block mb-2'>City</label>
                       <input 
                          type='text' 
                          className='w-full p-2 border rounded' 
                          placeholder='Please enter city...'
                          value={city}
                          required
                          onChange={(e) => setCity(e.target.value)}
                       />
                   </div>
                   <div className='mb-4'>
                       <label className='block mb-2'>Postal Code</label>
                       <input 
                          type='text' 
                          className='w-full p-2 border rounded' 
                          placeholder='Please postal code...'
                          value={postalCode}
                          required
                          onChange={(e) => setPostalCode(e.target.value)}
                       />
                   </div>
                   <div className='mb-4'>
                       <label className='block mb-2'>Country</label>
                       <input 
                          type='text' 
                          className='w-full p-2 border rounded' 
                          placeholder='Please enter country...'
                          value={country}
                          required
                          onChange={(e) => setCountry(e.target.value)}
                       />
                   </div>
                   <div className='mb-4'>
                       <label className='block'>Select Method</label>
                       <div className='mt-2'>
                          <label className='inline-flex items-center'>
                              <input 
                                 type='radio' 
                                 className='form-radio w-4 h-4 rounded-full text-[#d81b60] bg-gray-100 border-gray-300
                                 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2
                                 dark:bg-gray-700 dark:border-gray-600'
                                 name='paymentMethod' 
                                 value='PayPal'
                                 checked={paymentMethod === 'PayPal'}
                                 onChange={(e) =>  setPaymentMethod(e.target.value)}
                              >
                              </input>
                              <span className='ml-2'>PayPal or Credit Card</span>
                          </label>
                       </div>
                   </div>
                   <button 
                     className='bg-[#d81b60] hover:bg-[#c2185b] text-white py-2 px-4 rounded-lg w-full'
                     type='submit'
                    >
                      Continue
                   </button>
              </form>
        </div>
    </div>
  )
}

export default Shipping
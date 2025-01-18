import React, { useState, useEffect } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../helpers/loader/index.js'
import {toast} from 'react-toastify'
import {setCredentials} from '../../../../redux/features/auth/authSlice.js'
import { useRegisterMutation } from '../../../../redux/api/usersApiSlice.js'
import signUp from '../../../../assets/sign-up.avif'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, {isLoading}] = useRegisterMutation()
  const {userInfo} = useSelector(state => state.auth)

  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
     if(userInfo){
        navigate(redirect)
     }
  },[navigate, redirect, userInfo])

  const submitHandler = async(e) => {
     e.preventDefault()
     if(password !== confirmPassword){
         toast.error('Passwords do not match')
     }
     else{
        try{
           const res = await register({username, email, password}).unwrap()
           dispatch(setCredentials({...res}))
           navigate(redirect)
           toast.success('User successfully registered')
        }
        catch(error){
           console.error(error)
           toast.error(error.data.message)
        }
     }
  }

  return (
    <div className='pl-[10rem] flex flex-wrap'>
       <section >
          <div className='mr-[4rem] mt-[5rem]'>
              <h1 className='text-2xl font-semibold mb-4'>Sign Up</h1>
              <form
                 className='container w-[40rem]'
                 onSubmit={submitHandler}
              >
                 <div className='my-[2rem]'>
                     <label
                        htmlFor='name'
                        className='block text-sm font-medium'
                     >
                      Username
                     </label>
                     <input 
                        type='text' 
                        id='name' 
                        className='mt-1 p-2 border rounded w-full outline-none'
                        placeholder='Enter your username...'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                     />
                 </div>

                 <div className='my-[2rem]'>
                     <label
                        htmlFor='email'
                        className='block text-sm font-medium'
                     >
                       Email
                     </label>
                     <input 
                        type='email' 
                        id='email' 
                        className='mt-1 p-2 border rounded w-full outline-none'
                        placeholder='Enter your email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                 </div>

                 <div className='my-[2rem]'>
                     <label
                        htmlFor='password'
                        className='block text-sm font-medium'
                     >
                       Password
                     </label>
                     <input 
                        type='password' 
                        id='password' 
                        className='mt-1 p-2 border rounded w-full outline-none'
                        placeholder='Enter your password...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                 </div>

                 <div className='my-[2rem]'>
                     <label
                        htmlFor='confirmPassword'
                        className='block text-sm font-medium'
                     >
                        Confirm Password:
                     </label>
                     <input 
                        type='password' 
                        id='confirmPassword' 
                        className='mt-1 p-2 border rounded w-full outline-none'
                        placeholder='Confirm password...'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                     />
                 </div>
                 <button 
                   disabled={isLoading}
                   type='submit'
                   className='bg-[#d81b60] hover:bg-[#c2185b] text-white px-4 py-2 rounded cursor-pointer'
                  >
                     Continue
                  </button>
                  {
                     isLoading && <Loader/>
                  }
              </form>
              <div className='mt-4'>
                 <p>
                    Already have an account? {" "}
                    <Link 
                     to={redirect ? `/sign-in?redirect=${redirect}` : '/sign-in'}
                     className='text-[#d81b60] hover:underline'
                    >
                        Sign In
                    </Link>
                 </p>
              </div>
          </div>
       </section>
       <img src={signUp} className='h-[44rem] w-[40%] xl:block md:hidden sm:hidden rounded-lg object-cover'/>
    </div>
  )
}

export default SignUp
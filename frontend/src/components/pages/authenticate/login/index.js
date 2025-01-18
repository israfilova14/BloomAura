import React, { useState, useEffect }  from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../../../redux/api/usersApiSlice'
import { setCredentials } from '../../../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../../helpers/loader/index.js'
import signIn from '../../../../assets/sign-in.avif'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, {isLoading}] = useLoginMutation()

  const {userInfo} = useSelector(state => state.auth)

  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
       if(userInfo){
         navigate(redirect)
       }
  }, [navigate, redirect, userInfo])

  const submitHandler = async(e) => {
     e.preventDefault()
     try{
         const response = await login({email, password}).unwrap()
         console.log(response)
         dispatch(setCredentials({...response}))
         toast.success("User successfully sign in")
     }
     catch(error){
         toast.error(error?.data?.message || error.message)
         console.log(error)
     }
  }

  return (
    <div>
       <section className='pl-[10rem] flex flex-wrap'>
           <div className='mr-[4rem] mt-[5rem]'>
              <h1 className='text-2xl font-semibold mb-4'>
                 Sign In
              </h1>
              <form 
                onSubmit={submitHandler}
                className='container w-[40rem]'>
                 <div className='my-[2rem]'>
                     <label 
                       htmlFor='email' 
                       className='block text-sm font-medium'
                      >
                        Email Address
                     </label>
                     <input 
                        type='email' 
                        id='email' 
                        className='mt-1 p-2 rounded w-full outline-none' 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Enter your email...'
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
                        className='mt-1 p-2 rounded w-full outline-none' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Enter your password...'
                        required
                     />
                 </div>
                 <button 
                     
                    type='submit'
                    className='bg-[#d81b60] hover:bg-[#c2185b] px-4 py-2 rounded cursor-pointer text-white'
                >
                     Continue
                </button>
                {
                  isLoading && <Loader/>
                }
              </form>
              <div className='mt-4'>
                 <p>
                    New Customer? {"   "}
                    <Link
                       to={redirect ? `/sign-up?redirect=${redirect}` : '/sign-up'}
                       className='text-[#d81b60] hover:underline ml-1'
                    >
                      Sign Up
                    </Link>
                 </p>
              </div>
           </div>
           <img src={signIn} className='h-[44rem] w-[40%] xl:block md:hidden sm:hidden rounded-lg object-cover'/>
       </section>
    </div>
  )
}

export default Login
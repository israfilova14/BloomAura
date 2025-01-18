import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../../helpers/loader'
import { setCredentials } from '../../../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useUpdateProfileMutation } from '../../../../redux/api/usersApiSlice' 

const Profile = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {userInfo} = useSelector(state => state.auth)
  console.log(userInfo);
  
  const [updateProfile, {isLoading: loadingUpdateProfile}] = useUpdateProfileMutation()

  useEffect(() => {
    setUsername(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.username, userInfo.email])

  const dispatch = useDispatch()
  
  const submitHandler = async(e) => {
     e.preventDefault()

     if(password !== confirmPassword){
        toast.error("Passwords do not match")
     }
     else{
        try{
           const response = await updateProfile(
            {
                _id: userInfo._id, 
                username,
                email, 
                password, 
                confirmPassword
            }
          ).unwrap()
          
          dispatch(setCredentials({...response}))
          toast.success("Profile updated successfully!")
        }
        catch(error){
           toast.error(error?.data?.message || error?.message)
        }
     }
  }
  return (
    <div className='container mx-auto p-4 mt-[10rem]'>
       <div className='flex justify-center items-center md:flex md:space-x-4'>
           <div className='md:w-1/3'>
              <h2 className='text-2xl font-semibold mb-4'>
                  Update <span className='text-[#d81b60]'>Profile.</span>
              </h2>
              <form onSubmit={submitHandler}>
                  <div className='mb-4'>
                      <label className='block mb-2'>Username</label>
                      <input 
                        type='text' 
                        placeholder='Enter your username...'
                        className='form-input p-2 rounded-sm w-full outline-none'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                  </div>
                  <div className='mb-4'>
                      <label className='block mb-2'>Email Address</label>
                      <input 
                        type='text' 
                        placeholder='Enter your email...'
                        className='form-input p-2 rounded-sm w-full outline-none'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                  </div>
                  <div className='mb-4'>
                      <label className='block mb-2'>Password</label>
                      <input 
                        type='password' 
                        placeholder='Enter your password...'
                        className='form-input p-2 rounded-sm w-full outline-none'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                  </div>
                  <div className='mb-4'>
                      <label className='block mb-2'>Confirm Password</label>
                      <input 
                        type='password' 
                        placeholder='Confirm password...'
                        className='form-input p-2 rounded-sm w-full outline-none'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        />
                  </div>
                  <div className='flex justify-between'>
                      <button 
                        type='submit' 
                        className='bg-[#d81b60] hover:bg-[#c2185b] text-white py-2 px-4 rounded'
                      >
                        Update Profile
                      </button>
                      <Link 
                        to='/user-orders' 
                        className='bg-[#007f5f] hover:bg-[#00a375] text-white py-2 px-4 rounded'
                      >
                        My Orders
                      </Link>
                  </div>
              </form>
           </div>
           {loadingUpdateProfile && <Loader/>}
       </div>
    </div>
  )
}

export default Profile
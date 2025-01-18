import React, {useState} from 'react'
import {AiOutlineHome, 
        AiOutlineShopping,
        AiOutlineLogin, 
        AiOutlineUserAdd, 
        AiOutlineShoppingCart
} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { IoChevronDownOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {useLogoutMutation} from '../../../redux/api/usersApiSlice.js'
import { logout } from '../../../redux/features/auth/authSlice.js'
import FavoritesCount from '../../pages/products/favorites_count/index.js';

const NavigationBar = () => {
  const {userInfo} = useSelector(state => state.auth)
  const {cartItems} = useSelector((state) => state.cart)

  const [dropdownOpen, setDropDownOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async() => {
      try{
         await logoutApiCall().unwrap()
         dispatch(logout())
         navigate('/sign-in')
      }
      catch(error){
        console.error(error)
      }
  }

  return (
    <div 
      style={{zIndex: 999}} 
      className={`${showSidebar ? 'hidden' : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between 
                  p-4 text-white bg-[#2c2c2c] w-[5%] hover:w-[12%] h-[100vh] fixed`}
      id='navigation-container'
    >
       <div className='flex flex-col justify-center space-between space-y-4'>
          <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2 group'>
              <AiOutlineHome className='mr-2 mt-[3rem]' size={24}/>
              <span className='hidden nav-item-name mt-[3rem] group-hover:block'>
                  HOME
              </span>
          </Link>
          <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2 group'>
              <AiOutlineShopping className='mr-2 mt-[3rem]' size={24}/>
              <span className='hidden nav-item-name mt-[3rem] group-hover:block'>
                  SHOP
              </span>
          </Link>
          <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2 group'>
              <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={24}/>
              <span className='hidden nav-item-name mt-[3rem] group-hover:block'>
                  CART
              </span>
              <div className='absolute top-9 ml-4'>
                 {
                   cartItems.length > 0 
                      && 
                      (
                        <div>
                           <span className='px-1.5 py-0.7 text-sm font-semibold text-white bg-[#d81b60] rounded-full'>
                               {cartItems.reduce((a, c) => a + c.qty, 0)}
                           </span>
                        </div>
                      )
                 }
              </div>
          </Link>
          <Link to='/favorites' className='flex items-center transition-transform transform hover:translate-x-2 group'>
              <FaHeart className='mr-2 mt-[3rem]' size={24}/>
              <span className='hidden nav-item-name mt-[3rem] group-hover:block'>
                  FAVORITE
              </span>
              <FavoritesCount/>
          </Link>
       </div>
       <div className='relative'>
           <button 
            className='flex items-center justify-center text-gray-800 focus:outline-none'
            onClick={toggleDropdown}
           >
                {
                  userInfo 
                     ? 
                     <span className='text-white text-sm'>
                        {userInfo.username.slice(0, 10)}
                     </span> 
                     : 
                     (<></>)
                }
                {
                  userInfo && (
                     <IoChevronDownOutline className='text-white'/>
                  )
                }
           </button>
            {
               dropdownOpen && userInfo && (
                  <ul 
                    className={`absolute right-0 mb-1 mr-16 space-y-1 bg-white text-[#2c2c2c] ${!userInfo.isAdmin ? '-top-24' : '-top-80'}`}
                  >
                    {
                     userInfo.isAdmin && (
                        <>
                          <li>
                            <Link 
                              to='/admin/dashboard' 
                              className='block px-4 py-2 hover:bg-gray-100'
                            >
                               Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to='/admin/upload-product' 
                              className='block px-4 py-2 hover:bg-gray-100'
                            >
                               Products
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to='/admin/category-list' 
                              className='block px-4 py-2 hover:bg-gray-100'
                            >
                                Category
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to='/admin/order-list' 
                              className='block px-4 py-2 hover:bg-gray-100'
                            >
                                Orders
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to='/admin/users-list' 
                              className='block px-4 py-2 hover:bg-gray-100'
                            >
                                Users
                            </Link>
                          </li>
                        </>
                     )
                    }
                    <li>
                        <Link 
                         to='/profile' 
                         className='block px-4 py-2 hover:bg-[#b0b0b0]'
                        >
                           Profile
                        </Link>
                    </li>
                    <li>
                        <Link 
                         className='block px-4 py-2 hover:bg-gray-100'
                         onClick={logoutHandler}
                        >
                           Logout
                        </Link>
                     </li>
                  </ul>
               )
            }
       </div>
        {
          !userInfo && (
            <ul>
               <li>
                  <Link 
                     to='/sign-in'
                     className='flex items-center transition-transform transform hover:translate-x-2 group'
                  >
                     <AiOutlineLogin className='mr-2 mt-[3rem]' size={24}/>
                     <span className='hidden nav-item-name mt-[3rem] group-hover:block'>Sign In</span>
                  </Link>
               </li>
               <li>
                  <Link 
                     to='/sign-up'
                     className='flex items-center transition-transform transform hover:translate-x-2 group'
                  >
                     <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={24}/>
                     <span className='hidden nav-item-name mt-[3rem] group-hover:block'>Sign Up</span>
                  </Link>
               </li>
          </ul>
          )
        }
    </div>
  )
}

export default NavigationBar
import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div>
       <button 
         className={`${isMenuOpen ? 'top-2 right-2' : "top-5 right-7"} bg-[#5c5c5c] p-2 fixed rounded-lg`}
         onClick={toggleMenu}
       >
           {
             isMenuOpen 
             ? 
             (
              <FaTimes className='text-white'/>
             )
             :
             (
               <>
                 <div className='w-5 h-0.5 bg-white my-1'></div>
                 <div className='w-5 h-0.5 bg-white my-1'></div>
                 <div className='w-5 h-0.5 bg-white my-1'></div>
               </>
             )
           }
       </button>
       {
        isMenuOpen && (
          <section className='bg-[#5c5c5c] p-4 fixed right-7 top-5'>
              <ul className='list-none mt-2'>
                 <li>
                   <NavLink 
                     className='list-item py-1 px-3 mb-5 hover:bg-[#404040;] rounded-sm font-semibold' 
                     to='/admin/dashboard'
                     style={({isActive}) => ({
                         color: isActive ? 'yellowgreen' : 'white',
                     })}
                    >
                        Admin Dashboard
                    </NavLink>
                 </li>
                 <li>
                   <NavLink 
                     className='list-item py-1 px-3 mb-5 hover:bg-[#404040] rounded-sm font-semibold' 
                     to='/admin/category-list'
                     style={({isActive}) => ({
                         color: isActive ? 'yellowgreen' : 'white',
                     })}
                    >
                       Category List
                    </NavLink>
                 </li>
                 <li>
                   <NavLink 
                     className='list-item py-1 px-3 mb-5 hover:bg-[#404040] rounded-sm font-semibold' 
                     to='/admin/upload-product'
                     style={({isActive}) => ({
                         color: isActive ? 'yellowgreen' : 'white',
                     })}
                    >
                        Upload Products
                    </NavLink>
                 </li>
                 <li>
                   <NavLink 
                     className='list-item py-1 px-3 mb-5 hover:bg-[#404040] rounded-sm font-semibold' 
                     to='/admin/all-products'
                     style={({isActive}) => ({
                         color: isActive ? 'yellowgreen' : 'white',
                     })}
                    >
                        All Products
                    </NavLink>
                 </li>
                 <li>
                   <NavLink 
                     className='list-item py-1 px-3 mb-5 hover:bg-[#404040] rounded-sm font-semibold' 
                     to='/admin/users-list'
                     style={({isActive}) => ({
                         color: isActive ? 'yellowgreen' : 'white',
                     })}
                    >
                        Users List
                    </NavLink>
                 </li>
                 <li>
                   <NavLink 
                     className='list-item py-1 px-3 mb-5 hover:bg-[#404040] rounded-sm font-semibold' 
                     to='/admin/order-list'
                     style={({isActive}) => ({
                         color: isActive ? 'yellowgreen' : 'white',
                     })}
                    >
                        Orders List
                    </NavLink>
                 </li>
              </ul>
          </section>
        )
       }
    </div>
  )
}

export default AdminMenu
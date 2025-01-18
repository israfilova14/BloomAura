import React from 'react'
import { IoClose } from "react-icons/io5"

const Modal = ({isOpen, onClose, children}) => {
  return (
    <div>
       {
        isOpen && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
             <div className='fixed inset-0 bg-[#2c2c2c] opacity-50'>
                <div className='absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right'>
                   <button 
                     className='text-[#2c2c2c] font-semibold hover:text-gray-800 focus:outline-none mr-2'
                     onClick={onClose}
                    >
                       <IoClose size={20}/>
                    </button>
                    {children}
                </div>
             </div>
          </div>
        )
       }
    </div>
  )
}

export default Modal
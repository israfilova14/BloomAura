import React from 'react'

const Message = ({variant, children}) => {

  const getVariantClass = () => {
     switch(variant){
        case "success":
             return "bg-[#4caf50] text-white "
        case "error":
             return "bg-[#e53935] text-white"
        default: 
             return "bg-blue-200 text-[#2196f3]"
     }
  }

  return (
     <div className='flex items-center justify-center'>
       <div className={`w-[70%] p-5 rounded ${getVariantClass()}`}>
          {children}
       </div>
     </div>
  )
}

export default Message
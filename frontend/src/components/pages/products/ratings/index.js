import React from 'react'
import {FaRegStar, 
        FaStar, 
        FaStarHalfAlt
       } from 'react-icons/fa'

const Ratings = ({value, text, color}) => {
  const fullStars = Math.floor(value)
  const halfStars = value - fullStars > 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStars

  return (
    <div className='flex items-center'>
       {
          [...Array(fullStars)].map((_, index) => (
            <FaStar key={value} className='text-blue-400' size={20}/>
          ))
       }
       {
          halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1`}/>
       }
       {
          [...Array(emptyStars)].map((_, index) => (
             <FaRegStar key={index} className={`text-${color} ml-1 text-blue-400`} size={20}/>
          ))
       }
       <span className={`rating-text ml-[2rem] text-${color}`}>
           {text}
       </span>
    </div>
  )
}

Ratings.defaultProps = {
  color: '#e5e7eb'
}

export default Ratings
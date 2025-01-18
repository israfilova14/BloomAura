import React from 'react'

const ProgressSteps = ({step1, step2, step3}) => {
  return (
    <div className='flex justify-center items-center space-x-4'>
        <div className={`${step1 ? "text-[#007f5f]" : 'text-gray-900'} text-lg`}>
            <span className='ml-2 font-semibold'>Login</span>
            <div className='mt-2 text-lg text-center'>✅</div>
        </div>

        {
          step2 && (
            <>
              {step1 && <div className='h-0.5 w-[10rem] bg-[#007f5f]'></div>}
              <div className={`${step1 ? "text-[#007f5f]" : 'text-gray-900'} text-lg`}>
                 <span className='font-semibold'>Shipping</span>
                 <div className='mt-2 text-lg text-center'>✅</div>
              </div>
            </>
          )
        }

        <>
          {step1 && step2 && step3 
              ? 
              (
                <div className='h-0.5 w-[10rem] bg-[#007f5f]'></div>
              )
              :
              ("")
           }
           <div className={`${step3 ? 'text-[#007f5f]' : 'text-gray-900'}`}>
               <span className={`${!step3 ? 'ml-[10rem]' : ''} font-semibold text-lg`}>Summary</span>
               {
                  step1 && step2 && step3 
                  ? 
                  (
                      <div className='mt-2 text-lg text-center'>✅</div>
                  )
                  :
                  ("")
               }
           </div>
        </>
    </div>
  )
}

export default ProgressSteps
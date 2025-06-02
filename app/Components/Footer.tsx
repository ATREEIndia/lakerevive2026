import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className=' w-full bg-green-900 p-4 text-white text-center gap-2 flex sm:gap-5 justify-center flex-wrap'>
        <p  className=' text-sm '>© 2025</p>
        <div className=' cursor-pointer text-sm '>Designed and Developed by <a
      href='https://www.linkedin.com/in/sreekuttanvn/'
      className='underline cursor-pointer hover:text-gray-300'
      target='_blank'
      rel='noopener noreferrer'
    >
      Sreekuttan V N
    </a></div>
    </div>
  )
}

export default Footer

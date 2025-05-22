import Image from 'next/image'
import React from 'react'
import banner_img from '@/public/banner_img.jpg'

type bannerprobs={
  title?:string;
  subtitle?:string
}

const Banner = ({title, subtitle}:bannerprobs) => {
  return (
    <div className='relative w-full sm:h-[500px] overflow-hidden'>
      {/* overlay */}
      <div className=' absolute top-0 left-0 w-full h-full bg-green-700 opacity-55 z-10'></div>
      <Image src={banner_img} alt="" fill className='object-cover' priority ></Image>
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <h1 className='text-5xl font-semibold text-white z-20'>{title}</h1>
      </div>
      
    </div>
  )
}

export default Banner

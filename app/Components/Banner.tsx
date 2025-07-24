import Image from 'next/image'
import React from 'react'
import banner_img from '@/public/banner_img.jpg'
import Link from 'next/link';

type bannerprobs={
  title?:string;
  subtitle?:string
}

const Banner = ({title, subtitle}:bannerprobs) => {
  return (
    <div className='relative w-full h-[300px] sm:h-[500px] overflow-hidden'>
      {/* overlay */}
      <div className=' absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10'></div>
      <Image src={banner_img} alt="" fill className='object-cover' priority ></Image>
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col gap-5'>
        <h1 className='sm:text-5xl text-2xl font-semibold text-white z-20'>{title}</h1>
        <Link className={`${title==="LakeRevive"?'block':'hidden'}  text-white z-20 bg-green-600 p-4 rounded-xl font-semibold cursor-pointer shadow-xl hover:bg-green-700`} href='/tool'>Explore the Tool</Link>
      </div>
      
    </div>
  )
}

export default Banner

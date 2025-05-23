import Image, { StaticImageData } from 'next/image'
import React from 'react'
import algalbllom from '@/public/algalBloom.jpg'
import Textbox from './Textbox'
import SubHeading from './SubHeading'
import SubHeadingbold from './SubHeadingbold'

type Zigzagsectionparams={
  item_index:number,
     section_image:StaticImageData,
    heading:string,
    content:React.ReactNode;
}

const Zigzgasection = ({item_index,section_image, heading,content}:Zigzagsectionparams) => {
  return (
    <div className={`w-full flex flex-col sm:flex-row ${item_index%2>0?'':'sm:flex-row-reverse'}  `}>
      {/* left */}
      <div className='relative h-[300px] sm:h-auto lg:min-h-[500px] sm:w-[50%] '>
        <Image fill className='object-cover' src={section_image} alt=''></Image>

      </div>

{/* right */}
      <div className='relative sm:w-[50%] flex flex-col justify-center items-center p-4 lg:p-8  gap-2'>
        <SubHeadingbold text={heading}></SubHeadingbold>
        <Textbox Content={content}></Textbox>

      </div>
      
    </div>
  )
}

export default Zigzgasection

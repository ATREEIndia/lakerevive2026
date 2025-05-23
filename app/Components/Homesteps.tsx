import Image, { StaticImageData } from 'next/image'
import React from 'react'
import image from '@/public/algalBloom.jpg'
import SubHeading from './SubHeading'
import Textbox from './Textbox'

type homestepsparam={
    step_image:StaticImageData,
    heading: string,
    heading_mob?: string,
    content:string
}

const Homesteps = ({step_image, heading, heading_mob="", content}:homestepsparam) => {
    return (
        <div className='w-full flex lg:px-15 mt-2  justify-center items-center'>
            {/* left */}
            <div className=' hidden sm:flex w-[200px] h-[200px] rounded-[10px] relative overflow-hidden shadow-2xl '>

                <Image
                    src={step_image}
                    alt='Image of steps'
                    fill
                    className='object-cover'
                />


            </div>

            {/* right */}
            <div className='w-full h-full justify-center items-center px-10 '>
                <SubHeading customClassName='hidden sm:flex  text-xl font-semibold' text={heading}></SubHeading>
                <SubHeading customClassName=' sm:hidden text-xl font-semibold' text={heading_mob}></SubHeading>
                <p className='text-gray-700 font-normal flex justify-left  lg:text-lg whitespace-pre-line'>{content}</p>
                
            </div>

        </div>
    )
}

export default Homesteps

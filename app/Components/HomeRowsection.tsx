import Image, { StaticImageData }  from 'next/image'
import React from 'react'
import image from '@/public/algalBloom.jpg'
import SubHeading from './SubHeading'
import Textbox from './Textbox'

type homerowsectionprobs={
    section_image:StaticImageData,
    heading:string,
    content:React.ReactNode;
}

const HomeRowsection = ({section_image, heading,content}:homerowsectionprobs) => {
    return (
        <div className='w-full flex flex-col sm:flex-row pb-4 border-b-2 border-gray-300'>
            {/* left */}
            <div className=' relative h-[300px] sm:w-[50%]'>
                <Image
                 className='object-cover'
                    src={section_image}
                    alt='image'
                    fill
                ></Image>
            </div>

            {/* right */}
            <div className='w-full flex flex-col lg:p-8 py-4 justify-center '>
                <div>
                   <div className='w-full flex items-start justify-start px-4 '>
                    <SubHeading customClassName='text-xl font-semibold'
                        text={heading}></SubHeading>

                </div>

                <div className='w-full flex items-center justify-center p-4 mt-1'>
                    <Textbox 
                        Content={content}></Textbox>

                </div> 
                </div>
                

            </div>

        </div>
    )
}

export default HomeRowsection

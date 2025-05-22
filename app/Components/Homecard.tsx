import Image, { StaticImageData } from 'next/image'
import React from 'react'
import image from '@/public/algalBloom.jpg'
import Heading from './Heading'
import SubHeading from './SubHeading'
import Textbox from './Textbox'

type homecardprobs={
    card_image:StaticImageData,
    title:string,
    content?:string
}

const Homecard = ({card_image, title, content=""}:homecardprobs) => {
    return (
        <div className='border-2 p-2 gap-2 border-gray-200 rounded-lg flex flex-col flex-1'>
            <div className='relative w-full h-75 object-cover rounded-md'>
                <Image 
                 className='object-cover'
                   fill
                    src={card_image}
                    alt=''></Image>
                    
                    
            </div>
           
            <SubHeading customClassName='font-semibold' text={title}></SubHeading>
            <Textbox Content={content}></Textbox>


        </div>
    )
}

export default Homecard

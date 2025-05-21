import Image from 'next/image'
import React from 'react'
import placeholder from '@/public/place_holder.jpg'
import Heading from './Heading'
import SubHeading from './SubHeading'
import Slider from './Slider'
import Link from 'next/link'

type resultprobs={
    title: string;
    area?: string;
    percent?: string;
    images:any[];
    btn_link:string;
    description?:string

}

const Result = ({title, area='0', percent, images, btn_link, description}:resultprobs) => {
    return (
        <div className='flex gap-2 flex-col lg:flex-row px-2  '>
             <div className='border-2 p-4 shadow-2xl border-gray-200 rounded-2xl flex flex-col'>
                <div className='w-full overflow-clip'>
                    <div className=' w-[400px] sm:w-[750px] lg:w-[520px]  px-4'>
                        <Slider images={images}></Slider>
                    </div>
                    
                </div>
                <h1 className='w-full mt-4 text-center font-medium text-xl'>{title}</h1> 
                {/* The NBS Solution is Floating island */}
                <div className={`${area?.length>1?'flex flex-col':'hidden'} px-4 py-2`}>
                     <p>Area required : {area}</p>
                <p>Lake area covered : {percent} </p>
                <h1 className='w-full  text-center mt-2 font-medium text-lg'>Why this suggestion?</h1> 
                </div>
                <div className={`${area?.length>1?'flex':'mt-5'} px-4 py-2`}>
                   <p className='whitespace-pre-line'>{description}</p> 
                </div>
                
               
               
                <div className='w-full py-4 flex flex-col-reverse  items-center flex-1 '>
                    <Link href={btn_link} target='_blank'>
                    <button className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                    >
                        Know More
                    </button>
                    </Link>
                    
                </div>

            </div>


          




        </div>
    )
}

export default Result

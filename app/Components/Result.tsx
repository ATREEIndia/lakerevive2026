import Image from 'next/image'
import React from 'react'
import placeholder from '@/public/place_holder.jpg'
import Heading from './Heading'
import SubHeading from './SubHeading'
import Slider from './Slider'
import Link from 'next/link'

type resultprobs = {
    title: string;
    area?: string;
    percent?: string;
    images: any[];
    btn_link: string;
    description?: string
    handlesingleslide?: () => void;

}

const Result = ({ title, area = '0', percent, images, btn_link, description, handlesingleslide }: resultprobs) => {

    return (
        <div className='flex flex-col flex-wrap p-4 w-[350px] md:w-[300px] sm:w-[25vw] lg:w-[30vw] border-2 border-gray-200 shadow-2xl rounded-2xl'>

            {/*sroll image */}
            <div className='w-full ' >
                <Slider images={images} handlesingleslide={handlesingleslide} ></Slider>
            </div>

            {/* Heading */}
            <h1 className='w-full text-center font-bold text-xl mt-2'>{title}</h1>

            {/* area and percent */}
            <div className={` ${area.length>1?'flex':'hidden'} w-full mt-2  flex-col gap-2`}>
                <p>Area required : {area}</p>
                <p>Lake area covered : {percent} </p>
            </div>

            {/* Heading 2 */}
            <h1 className={` ${area.length>1 && description?.length!==0 ?'flex justify-center text-center':'hidden'} w-full  font-medium text-lg lg:text-xl mt-4`}>Why this suggestion?</h1>

            {/* description */}
            <p className='whitespace-pre-line mt-2 '>{description}</p>

            {/* know more button */}
            <div className='w-full h-full flex flex-col-reverse items-center mt-4 flex-1 '>
                <Link href={btn_link} target='_blank'>
                    <button className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'>
                        Know More
                    </button>
                </Link>

            </div>














            {/* 
             <div className='border-2 p-4 shadow-2xl border-gray-200 rounded-2xl flex flex-col'>
                <div className='w-full overflow-clip'>
                    <div className=' w-[400px] sm:w-[750px] lg:w-[520px]  px-4'>
                        <Slider images={images}></Slider>
                    </div>
                    
                </div>
                <h1 className='w-full mt-4 text-center font-medium text-xl'>{title}</h1> 
                
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
*/}






        </div>
    )
}

export default Result

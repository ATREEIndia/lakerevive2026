import Image from 'next/image'
import React from 'react'
import placeholder from '@/public/place_holder.jpg'
import Heading from './Heading'
import SubHeading from './SubHeading'

const Result = () => {
    return (
        <div className='flex gap-2 flex-col lg:flex-row px-4 lg:px-10'>
             <div className='border-2 p-4 shadow-2xl border-gray-200 rounded-2xl flex flex-col'>
                <div className='w-full h-[300px] overflow-clip'>
                    <Image className='object-cover' src={placeholder} alt='' />
                </div>
                <h1 className='w-full mt-2 text-center font-medium text-xl'>The NBS Solution is Floating island</h1>
                <p>Area Required for the floating islands : </p>
                <p>Percentage of lake area convered : </p>
                <h1 className='w-full  text-center mt-2 font-medium text-lg'>Why this suggestion</h1>
                <p>Description</p>
                <div className='w-full py-4 flex flex-col justify-center items-center'>
                    <button
                        className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                    >
                        Know More
                    </button>
                </div>

            </div>


            <div className='border-2 p-4 shadow-2xl border-gray-200 rounded-2xl flex flex-col'>
                <div className='w-full h-[300px] overflow-clip'>
                    <Image className='object-cover' src={placeholder} alt='' />
                </div>
                <h1 className='w-full mt-2 text-center font-medium text-xl'>Constructed Wetland</h1>
                <p>Area Required for the CW : </p>
                <p>Percentage of lake area convered : </p>
                <h1 className='w-full  text-center mt-2 font-medium text-lg'>Why this suggestion</h1>
                <p>Description</p>
                <div className='w-full py-4 flex flex-col justify-center items-center'>
                    <button
                        className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                    >
                        Know More
                    </button>
                </div>
            </div>

            <div className='border-2 p-4 shadow-2xl border-gray-200 rounded-2xl flex flex-col'>
                <div className='w-full h-[300px] overflow-clip'>
                    <Image className='object-cover' src={placeholder} alt='' />
                </div>
                <h1 className='w-full mt-2 text-center font-medium text-xl'>Shoreline Vegitation</h1>          
           
                <p>Description</p>
                <div className='w-full  py-4 flex  flex-1 flex-col-reverse justify-baseline items-center overflow-auto'>
                    <button
                        className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                    >
                        Know More
                    </button>
                </div>
            </div>



        </div>
    )
}

export default Result

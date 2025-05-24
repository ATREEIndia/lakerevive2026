import Image, { StaticImageData } from 'next/image'
import React from 'react'

type Obsprobs = {
    image: StaticImageData;
    title: string,
    explanation: string,
    handleobs:()=>void;

}

const ObservationsTab = ({ image, title, explanation, handleobs }: Obsprobs) => {
    return (
        <div >
            <div className='lg:h-[400px] sm:h-[420px]  bg-white p-2 rounded-lg flex mt-5 border-2 border-[#c8c6c4] shadow-lg flex-col '>
                <div className='relative rounded-2xl  h-[200px] overflow-clip flex items-center'>
                    <Image className='rounded-2xl shadow-lg bg-cover object-cover overflow-hidden' src={image} alt='fishkill' ></Image>

                </div>
                <div className='flex-2/4 flex flex-col justify-center p-4 px-1'>
                    <h1 className='font-medium text-lg'>{title}</h1>
                    <p className='font-light'>{explanation}</p>
                    <div className='flex flex-col-reverse align-bottom  h-full'>
                        <div className='w-full flex items-center justify-start gap-3 px-4 p-2 mt-2 bg-gray-200 rounded-xl '>

                            <input className='w-5 h-5 cursor-pointer accent-red-700' type='checkbox' onChange={handleobs}></input>


                            <p>Yes</p>
                        </div>
                    </div>


                </div>


            </div>
            {/* <div className='w-[100%] bg-white p-2 rounded-lg flex mt-5 border-2 border-[#c8c6c4] shadow-lg'>
            <div className='relative rounded-2xl w-[400px] h-[300px] overflow-clip flex items-center'>
                <Image className='rounded-2xl shadow-lg bg-cover object-cover overflow-hidden' src={image} alt='fishkill' ></Image>
           
            </div>
            <div className='flex-2/4 flex flex-col justify-center p-4 px-15'>
                <h1 className='font-medium text-lg'>{title}</h1>
                <p className='font-light'>{explanation}</p>
                <div className='w-full flex items-center justify-start gap-3 px-4 p-2 mt-5 bg-gray-200 rounded-xl '>
                
                     <input className='w-5 h-5 cursor-pointer accent-red-700' type='checkbox'></input>
   
                    
                 <p>Yes</p>    
                </div>

            </div>


        </div> */}
        </div>
    )
}

export default ObservationsTab

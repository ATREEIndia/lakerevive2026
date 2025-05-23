import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Image from 'next/image'
import img from '@/public/garden.jpg'
import { teams } from '../Constants'
import Link from 'next/link'
import Heading from '../Components/Heading'
import Textbox from '../Components/Textbox'

const page = () => {
  return  ( 
        <div className='w-full h-full '>
            <Navbar currentpage='Team' />
            <Banner title={"Our team"}></Banner>
            
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 p-4'>
                {teams.map((person: any, index) => {
                    return (
                        <Link key={index} href={person.Profie_url} className='flex justify-center items-center mx-2'>
                        
                        <div  className='flex flex-col justify-top gap-2 items-center  '>
                            <div className='flex w-50 h-50 overflow-hidden rounded-full border-2 border-white shadow object-cover hover:border-gray-300 hover:border-4'>
                                <Image src={person.Image_URL} width={0} height={0} alt='img' className='rounded-full object-cover ' />
                            </div>
                            <h1 className='text-xl font-semibold text-gray-700 text-center'>{person.Name}</h1>
                            <div className='h-10 w-full'>
                            <h1 className='text-lg font-normal text-gray-700 text-center'>{person.Designation}</h1>
                            <h1 className='text-lg font-normal text-gray-500 text-center'>{person.Designation2}</h1>
                            </div>
                            
                        </div>
                        </Link>
                    )
                })}
            </div>
             <div className='w-full' >
          <Textbox Content='Accnoledgement for the water lab team'></Textbox>
        </div>


            



        </div>
    )
}

export default page

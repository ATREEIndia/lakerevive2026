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
    return (
        <div className='w-full h-full '>
            <Navbar currentpage='Team' />
            <Banner title={"Our team"}></Banner>

            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2  gap-10  lg:grid-cols-3 lg:px-20 p-4'>
                {teams.map((person: any, index) => {
                    return (
                        <Link key={index} href={person.Profie_url} className='flex justify-center items-center mx-2'target='_blank'>

                            <div className='flex flex-col justify-top gap-2 items-center  '>
                                <div className='flex w-50 h-50 overflow-hidden rounded-full border-2 border-white shadow object-cover hover:border-gray-300 hover:border-4'>
                                    <Image src={person.Image_URL} width={0} height={0} alt='img' className='rounded-full object-cover ' />
                                </div>
                                <h1 className='text-xl font-semibold text-gray-700 text-center'>{person.Name}</h1>
                                <div className='h-10 w-full'>
                                    <h1 className='sm:text-lg font-normal text-gray-700 text-center'>{person.Designation}</h1>
                                    <h1 className='sm:text-lg font-normal text-gray-500 text-center'>{person.Designation2}</h1>
                                </div>

                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className='w-full flex justify-center text-center mt-5 gap-2 bg-gray-100 p-4 flex-col' >
                 <Heading text='Acknowledgment'/>
                <Textbox customstyle='text-center flex justify-center' Content={<>
                    <p>We thank Monika K., Vipin Kumar, Ramya K.A., Amina Shahab from Water and Soil Lab for their contribution to water quality analysis. We also sincerly thank Ashoka Trust for Research in Ecology and the Environment (ATREE) for their support and our funding partner HSBC Foundation.</p>
                    </>}></Textbox>
            </div>

            <div className='w-full flex flex-col gap-3 justify-center items-center mt-5' >
                <Heading text='Contact us'/>
                <Textbox Content={<>
                    <Link className='hover:text-green-700' href={'https://www.atree.org/water-and-soil-lab/'} target='_blank'>Water and Soil lab, ATREE</Link>
                   
                    </>}/>
                     <Link className='hover:text-green-700' href={'mailto:info@atree.org'}>info@atree.org</Link>
                      <Link className='hover:text-green-700' href={'mailto:waterlab@atree.org'}>waterlab@atree.org</Link> 
                    
            </div>






        </div>
    )
}

export default page

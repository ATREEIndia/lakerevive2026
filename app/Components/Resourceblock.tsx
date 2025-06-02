import React from 'react'
import Heading from './Heading'
import SubHeading from './SubHeading'
import Link from 'next/link'
import SubHeadingbold from './SubHeadingbold'
import Textbox from './Textbox'

type resourceprobs={
    title:string,
    subheading:string,
    link_url:string,
}

const Resourceblock = ({title,subheading,link_url}:resourceprobs) => {
  return (
    <div>
        <div className='h-60 bg-green-900 flex flex-col items-center justify-center rounded-2xl shadow-2xl'>
           <SubHeadingbold customClassName='text-white' text={title}></SubHeadingbold> 
           <Textbox customstyle='text-white' Content={subheading}></Textbox>
           <Link className='p-4 bg-green-200 rounded-xl mt-3 hover:bg-green-800 shadow-2xl hover:border-2 hover:border-white font-bold hover:text-white'
            href={link_url} target='_blank'>
           Know more
           </Link>
        </div>
        {/* ... */}
       
        
      
    </div>
  )
}

export default Resourceblock

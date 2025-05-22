import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Resourceblock from '../Components/Resourceblock'

const page = () => {
  return (
    <div>
        <Navbar currentpage='Resources'></Navbar>
        <Banner title='Resources'></Banner>
        <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 p-4 gap-2 '>
          <Resourceblock
          title='Title 1'
          subheading='Description'
          link_url='' />

          <Resourceblock
          title='Titel2'
          subheading='description'
          link_url='' />

          <Resourceblock
          title='Title 3'
          subheading='description'
          link_url='' />
       

        </div>

      
    </div>
  )
}

export default page

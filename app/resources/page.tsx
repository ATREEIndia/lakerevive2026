import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Resourceblock from '../Components/Resourceblock'
import { resource_list } from "../Constants"

const page = () => {
  return (
    <div>
      <Navbar currentpage='Resources'></Navbar>
      <Banner title='Resources'></Banner>
      <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 p-4 gap-2 '>

        {resource_list.map((resource, index) => {
          return (<div key={index}>
            <Resourceblock
              title={resource.resource_title}
              subheading={resource.resource_sub_title}
              link_url={resource.resource_URL} />
          </div>)
        })

        }

        


      </div>


    </div>
  )
}

export default page

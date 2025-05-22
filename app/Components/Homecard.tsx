import Image from 'next/image'
import React from 'react'
import image from '@/public/algalBloom.jpg'
import Heading from './Heading'

const Homecard = () => {
    return (
        <div>
            <div>
                <Image
                    src={image}
                    alt=''></Image>
            </div>
            <Heading text='User-friendly scientifically backed solutions'></Heading>


        </div>
    )
}

export default Homecard

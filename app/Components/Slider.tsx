import Image from 'next/image';
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import image1 from '@/public/place_holder.jpg'

type sliderproms = {
    images: any[]
}


const Slider = ({ images }: sliderproms) => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };




    return (
        <div>
            <Carousel responsive={responsive} infinite={true} keyBoardControl={true} >
                {images.map((img, index) => {
                    return <div className='h-[400px] object-cover'>
                        <Image className='' key={index} src={img} alt='' fill></Image>
                    </div>
                })}



            </Carousel>

        </div>
    )
}

export default Slider

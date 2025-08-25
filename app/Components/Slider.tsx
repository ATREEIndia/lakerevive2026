import Image from 'next/image';
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import image1 from '@/public/place_holder.jpg'
import { FaExpand } from "react-icons/fa";

type sliderproms = {
    images: any[],
   handlesingleslide?: (data: any) => void;
    custom_class?:string;
}


const Slider = ({ images, handlesingleslide , custom_class='h-[300px]'}: sliderproms) => {

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
        <div className='w-full'>
            <Carousel  responsive={responsive} infinite keyBoardControl>
                {images.map((img, index) => (
                    <div key={index} className={`relative  flex flex-col ${custom_class}`} >
                        <Image
                        unoptimized
                            src={img}
                            alt={`Image ${index + 1}`}
                            fill
                            className='object-cover'
                        />
                        <div className=' absolute hidden lg:block bg-black bottom-3 right-3 cursor-pointer border-2 border-white z-100000' onClick={() => handlesingleslide?.(images)} >
                             <FaExpand size={20} color='white' onClick={() => handlesingleslide?.(images)}></FaExpand>
                        </div>
                       
                    </div>
                ))}


            </Carousel>
        </div>
    )
}

export default Slider

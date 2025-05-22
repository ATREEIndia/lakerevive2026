import React from 'react'
import Slider from './Slider'

type SingleSliderprobs={
    images:any[];
    handlesingleslide?: () => void;

}

const SingleSlider = ({images,handlesingleslide}:SingleSliderprobs) => {
  return (
    <div className='w-[90vw] h-[1000px]'>
        <Slider images={images} custom_class='h-[100vh]' handlesingleslide={handlesingleslide}></Slider>
      
    </div>
  )
}

export default SingleSlider

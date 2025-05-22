import React from 'react'

type Textboxprobs={
    Content: string,
    customstyle?: string
}
const Textbox = ({Content, customstyle}:Textboxprobs) => {
  return (
    <div className={`text-gray-700 font-normal flex justify-left  lg:text-lg ${customstyle}`}>{Content}
      
    </div>
  )
}

export default Textbox
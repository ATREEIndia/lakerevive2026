import React from 'react'

type subheadingprobs={
    text:string,
    customClassName?:string
}

const SubHeadingbold = ({text, customClassName}:subheadingprobs) => {
  return (
    <div>
      <p className={` text-gray-700 text-xl font-semibold ${customClassName}`}>{text}</p>
    </div>
  )
}

export default SubHeadingbold

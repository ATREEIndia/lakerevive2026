import React from 'react'

type subheadingprobs={
    text:string,
    customClassName?:string
}

const SubHeading = ({text, customClassName}:subheadingprobs) => {
  return (
    <div>
      <p className={`text-lg font-medium text-gray-700 ${customClassName}`}>{text}</p>
    </div>
  )
}

export default SubHeading

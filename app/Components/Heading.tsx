import React from 'react'
type headingProbs={
    text: string,
    customClassname?: string
}

const Heading = ({text,customClassname}:headingProbs) => {
  return (
    <div>
      <h1 className={`font-bold text-2xl text-gray-800 ${customClassname}`}>{text}</h1>
    </div>
  )
}

export default Heading

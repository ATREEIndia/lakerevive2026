import React from 'react'

type inputprams={
    title:string,
    updatefunction:(m:any)=>void,
    value?:any,
    type?:string,
    disable_status?:boolean,
    custom_class?:string,
}

const Inputitem = ({title,updatefunction,value=0,type='number', disable_status=false, custom_class}:inputprams) => {
  return (
    <div>
      <div className='w-full flex flex-col justify-center items-center '>
            <p className='w-[90%] px-2 '>{title}</p>
            <input className={`w-[90%] p-2 border-2 border-gray-400 rounded-xl ${disable_status?'bg-gray-100':''} ${custom_class} `} disabled={disable_status} value={disable_status?'': value} type={type} placeholder={disable_status?'Field skipped':'Enter a value'} onChange={updatefunction}  onWheel={(e) => e.currentTarget.blur()}></input>
          </div>
    </div>
  )
}

export default Inputitem

import React, { useState } from 'react'
import Avatar from '../screens/Psykokoak.jpg'

export default function KoakBox({title, as, rs, desc}) {
  const [Hide, setHide] = useState("")

  const handleErase = () => {
    setHide("hidden")
  }

  return (
    <div className={`flex flex-col max-w-full h-fit border-2 border-black bg-[#f7e8ce] border-double rounded-lg drop-shadow-2xl ${Hide}`}>
      <div className="flex relative justify-center border-b-2 border-dashed border-black mt-2">
        <h1 className='text-xl capitalize pb-2 font-bold'>{title}</h1>
        <i className="fas fa-eraser text-2xl absolute right-2 text-black my-auto hover:text-red-500 hover:cursor-pointer" onClick={handleErase}></i>
      </div>
      <div className='flex flex-row space-x-12 py-1'>
        <div className='flex justify-evenly space-x-2 border-2 border-black bg-yellow-500 ml-16 p-2 my-auto w-3/12'>
          {as === "gmail" ? <i className="fab fa-google fa-lg my-auto"></i> : <i className={`fab fa-${as} fa-lg my-auto`}></i>}
          <span className='capitalize'>{as}</span>
          <i className="fas fa-arrow-right my-auto"></i>
          {rs === "gmail" ? <i className="fab fa-google fa-lg my-auto"></i> : <i className={`fab fa-${rs} fa-lg my-auto`}></i>}
          <span className='capitalize'>{rs}</span>
        </div>
        <div className='flex w-full justify-between'>
          <span className='capitalize my-auto text-lg w-5/6'>{desc}</span>
          <img src={Avatar} alt="koak avatar" className="mt-auto w-12 h-12"/>
        </div>
      </div>
    </div>
  )
}

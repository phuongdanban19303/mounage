import React from 'react'
import { FaUserCheck } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";

const Header = () => {
  return (
    <div className='w-[1299px] h-[56px] flex justify-end border-b-1 border-black/10'>
      <div className='flex justify-between items-center w-[161px] gap-2.5 mr-4 '>
      <FaRegBell/>
        <FaUserCheck/>
      
        <p>Duy Phuong</p>
      </div>
    </div>
  )
}

export default Header
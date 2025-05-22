import { navlink } from '@/app/Constants'
import Link from 'next/link'
import React from 'react'
import { IoMdClose } from "react-icons/io";


type mobpeob = {
    customClass: string
    clickfunction: ()=>void
}

const NavbarMobile = ({ customClass, clickfunction }: mobpeob) => {
    return (
        <div className={`lg:hidden mt-20 pt-5 flex flex-col items-center gap-5 absolute top-0 left-0 w-[70%] sm:w-[50%] bg-green-500 h-[70vh] z-1000 transition transform -translate-x-100 duration-500 ease-in-out ${customClass}`}>
            <div className='flex w-full justify-end px-10' onClick={clickfunction}>
                <IoMdClose size={30} color='white' />

            </div>
            <div className=' flex flex-col gap-5 pt-10'>
                {navlink.map((link, index) => {
                    return <Link key={index} href={link.href}>
                        <p className='text-white uppercase text-center '>{link.label}</p></Link>
                })}
            </div>

        </div>
    )
}

export default NavbarMobile

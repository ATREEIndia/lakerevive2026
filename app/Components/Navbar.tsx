'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../public/ATREE_logo.png'
import { navlink } from '@/app/Constants'
import Link from 'next/link'
import { HiMenuAlt3 } from "react-icons/hi";
import NavbarMobile from '././NavbarMobile'
import { url } from 'inspector'
import { currentlanguage } from './Languagecontex'


type navprobs = {
    currentpage: string
}

const Navbar = ({ currentpage }: navprobs) => {

    const [isopen, setisopen] = useState(true);
    const [navbg, setnavbg] = useState(false);

    function handlemenu() {
        setisopen(!isopen);

    }

    const { isEng, setisEng } = currentlanguage();
    function handlelanguage() {
        setisEng(!isEng);


    }
    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= 90) {
                setnavbg(true)
            }
            if (window.scrollY < 90) {
                setnavbg(false)
            }
        }
        window.addEventListener("scroll", handler)
    })


    return (
        <div>


            <div className={`fixed z-1000 w-full h-20  justify-between items-center px-1.5 flex lg:pl-20 shadow-xl ${navbg ? "bg-green-600" : ""}`}>

                <Link href={"https://www.atree.org/"} target='_blank'>
                    <div className='flex items-center'>

                        <Image src={logo} height={70} width={0} alt='logo' />
                        <div className='hidden sm:flex text-white flex-col text-sm'>
                            <h1>Ashoka Trust for Research</h1>
                            <h1>In Ecology and the Environment</h1>
                        </div>


                    </div>
                </Link>
                <div className=' gap-13 justify-between mr-[8%] hidden xl:flex lg:justify-center lg:items-center'>
                    {navlink.map((link, index) => {
                        return <Link key={index} href={link.href}>
                            <p className={`${currentpage === link.label ? "border-b-white border-b-2" : "flex"} text-white  hover:border-b-white hover:border-b-2`}>{link.label}</p>
                        </Link>
                    })}
                     <div className='p-2 bg-green-700 rounded-2xl px-4 flex justify-center items-center hover:bg-green-800'>
                        <p className={` cursor-pointer text-white text-sm hover:border-b-white hover:border-b-2`} onClick={handlelanguage}>ENG/KA</p>
                    </div>
                </div>


                <div className='xl:hidden mx-10' onClick={handlemenu}>
                    <HiMenuAlt3 color='white' size={30} />
                    <div>
                        {/* overlay */}


                        <NavbarMobile customClass={`${isopen ? "-translate-x-150 hidden " : "translate-x-0"} `} clickfunction={handlemenu} handlelanguage={handlelanguage} />
                    </div>

                </div><div className={`lg:hidden w-screen h-[20500px] absolute bg-gray-500 opacity-20 transform transition-transform  duration-400 ease-in-out z-90 
                    ${isopen ? "translate-x-full" : "translate-x-0"}`} onClick={handlemenu}></div>
            </div>





        </div>
    )
}

export default Navbar

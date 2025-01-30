import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {motion} from "motion/react"

// import 

function Navbar() {
    const {user} = useContext(AppContext)
    const {setShowLogin , logout, credit} = useContext(AppContext)
    // const [user,setUser] = useState(true);
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between py-2'>
        <Link to='/'>
            <motion.img  src={assets.logo} alt="" className='w-24 sm:w-28 rounded-full p-2' initial={{scale:0}} animate={{scale:1}} transition={{duration:1}} />
        </Link>

        <div>
            {user 
            ? <div className='flex items-center gap-2 sm:gap-3'>
                <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-gray-700 text-white px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                    <img className='w-5' src={assets.credit_star} alt="" />
                    <p className='text-xs sm:text-sm font-medium'>Credits left : {credit}</p>
                </button>
                <p className=' text-gray-600 max-sm:hidden pl-4 '>Hi, {user.name}</p>
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li onClick={logout} className='py-1 px-2 cursor-pointer pr-5'>Logout</li>
                        </ul>
                    </div>
                </div>
            </div> 
            : <div className='flex items-center gap-2 sm:gap-5 '>
                <p onClick={()=>navigate('/buy')} className='cursor-pointer border-2 border-gray-700 rounded-full px-3 py-2 sm:px-5 text-sm'>Pricing</p>
                <button onClick={()=>setShowLogin(true)} className='bg-gray-700 text-white px-7 py-2 sm:px-10 text-sm rounded-full font-medium'>Login</button>
            </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar

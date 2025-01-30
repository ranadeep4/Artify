import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'motion/react'

function Footer() {
  return (
    <motion.div initial={{opacity:0,x:-1000}} animate={{opacity:1,x:0}} transition={{duration:2}} className='flex items-center justify-between gap-4 py-3 mt-20'>
        <div className='flex items-center justify-center'>
            <img src='/favicon.ico' alt="" width={60}/>
            <p className='text-4xl font-bold text-orange-500'>Artify.</p>
        </div>
        <p className='flex-1 border-l border-gray-700 ml-10 pl-10 text-sm text-gray-500 max-sm:hidden'>Copyright @Artify.dev | All right reserved.</p>

        <div className='flex gap-2.5 '>
            <img src={assets.facebook_icon} alt="" width={35}/>
            <img src={assets.twitter_icon} alt="" width={35}/>
            <img src={assets.instagram_icon} alt="" width={35}/>
        </div>
    </motion.div>
  )
}

export default Footer
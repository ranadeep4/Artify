import React from 'react'
import { assets, stepsData } from '../assets/assets'
import { motion } from "motion/react"

function Steps() {
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-32'>
        <h1 className='text-2xl sm:text-3xl font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images</p>
        <div className='space-y-4 text-stone-100 w-full max-w-3xl text-sm'>
            {stepsData.map((item,index)=>(
                <div key={index} className='flex items-center gap-4 p-5 px-8 bg-gray-700 rounded-full shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300'>
                    <img width={40} src={item.icon} alt="" />
                    <div>
                        <h2 className='text-xl text-white font-medium'>{item.title }</h2>
                        <p>{item.description}</p>
                    </div>
                </div>
                
            ))}
        </div>
    </motion.div>
  )
}

export default Steps
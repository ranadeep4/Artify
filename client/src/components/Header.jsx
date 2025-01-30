import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { delay, motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function Header() {

  const {setShowLogin,user} = useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler = ()=>{
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }

  const array = [assets.sample_img_3, assets.sample_img_4, assets.sample_img_6, assets.sample_img_7, assets.sample_img_8, assets.sample_img_9, assets.sample_img_10, assets.sample_img_11]


  return (
    <motion.div className='flex flex-col items-center justify-center text-center my-20'  initial={{opacity:0.2, y:100}} transition={{duration:1}}
    whileInView={{opacity:1,y:0}} viewport ={{once:true}} >
      <motion.div   initial={{opacity:0, y:-20}} 
    animate={{opacity:1,y:0}} transition={{delay:0.2, duration:0.8}} className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
        <p><span className='text-gray-700 font-bold text-lg'>No.1 </span>Text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1 className='text-3xl max-w-[400px] sm:text-6xl sm:max-w-[750px] mx-auto mt-10 text-center'>Convert text to <span className='text-orange-500'
    
      initial={{opacity: 0}}   
      animate={{opacity: 1}}
      transition={{delay:0.4 ,duration: 2}} 
      >image</span>, in seconds...</motion.h1>
      <motion.p className='text-center max-w-xl mx-auto mt-5'
      initial={{opacity: 0,y:20}}
      animate={{opacity: 1,y:0}}
      transition={{delay:0.6,duration:0.8}}
      >Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</motion.p>
      <motion.button className='sm:text-lg text-white bg-gray-700 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
      onClick={onClickHandler}
      >Generate Images 
        <img className='h-6' src={assets.star_group} alt="" />
      </motion.button>

      <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:1,duration:1}}
      className='flex flex-wrap justify-center mt-16 gap-3'>
        {Array(8).fill('').map((item,index)=>(
          <motion.img 
          whileHover={{scale:1.05, duration:0.1}}
          initial={{opacity:0 , x:-100}}
          animate={{opacity:1, x:0}}
          transition={{delay:index*0.1,duration:0.8}}
          className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={array[index]} alt = "" key={index} width={90}/>
        ))}
      </motion.div>
      <motion.p 
      initial={{opacity:0}}

      animate={{opacity:1}}
      transition={{delay:1.2,duration:0.8}}
      className='mt-2 text-neutral-600'>Generated images from Artify</motion.p>
    </motion.div>
  )
}

export default Header
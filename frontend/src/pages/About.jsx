import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

        <div className='my-10 flex flex-col md:flex-row gap-12'>
          <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium quam voluptas magni, nisi commodi repellat voluptatibus incidunt unde neque quae?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, soluta tempora quam maxime accusantium alias voluptatum consequatur rerum distinctio quae.</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta libero ea provident quidem mollitia culpa earum officia.</p>
          </div>
        </div>
      </div>
    
  )
}

export default About

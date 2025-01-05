import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ---------Left Sec------ */}
        <div>
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, numquam explicabo? Et temporibus, repellat voluptatem quasi fuga non animi odit.</p>
        </div>
        {/* ---------Center Sec------ */}
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy</li>
            </ul>
        </div>
        {/* ---------Right Sec------ */}
        <div>
            <p className='text-xl font-medium nb-5'>Get in Touch</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1 000-000-0000</li>
                <li>a@a.com</li>
            </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>copyright</p>
      </div>
    </div>
  )
}

export default Footer

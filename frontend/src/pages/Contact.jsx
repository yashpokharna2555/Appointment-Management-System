import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {

  return (
    <div>
      <div className='text-center tex-2xl pt-10 text-gray-500'>
        <p>CONTACT US</p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p>Our Office</p>
          <p>2147 newhall st <br /> Timberleaf APartment</p>
          <p>Tel: (408)-581-2805</p>
        </div>
      </div>
    </div>
  )
}

export default Contact

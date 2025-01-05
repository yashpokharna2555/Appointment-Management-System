import React from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState('')
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[experience,setExperience] = useState('1 Year')
  const[fees,setFees] = useState('')
  const[about,setAbout] = useState('')
  const[speciality,setSpeciality] = useState('General Physician')
  const[degree,setDegree] = useState('')
  const[address1,setAddress1] = useState('')
  const[address2,setAddress2] = useState('')

  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if(!docImg) {
        return toast.error("Img not selected")
      }
      const formData = new FormData()

      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1: address1, line2: address2}))

      //console.log form data
      formData.forEach((value,key) => {
        console.log(`${key}:${value}`);
        
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers: {aToken}})
      console.log(data);
      if(data.success) {
        toast.success(data.message)
        setDocImg(false);
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }

  }
  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
      <p className="text-2xl font-bold text-gray-700">Add Doctor</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Doctor Picture */}
        <div className="flex flex-col items-center border-dashed border-2 border-gray-300 p-4 rounded-lg">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload Area" className="w-20 h-20 object-contain" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="mt-2 text-gray-500 text-sm">Upload Doctor<br />Picture</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Doctor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Doctor Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Doctor Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <select onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              {[...Array(10).keys()].map((i) => (
                <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fees</label>
            <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Fees" required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Speciality */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Speciality</label>
            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Education</label>
            <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address Line 1" required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2" />
            <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address Line 2" required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* About Doctor */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">About Doctor</label>
            <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder="Write about doctor" rows={5} className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button type="submit"  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;

import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
const Login = () => {
  const [state, setState] = useState('Admin');
  const {setAToken, backendUrl} = useContext(AdminContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {setDToken} = useContext(DoctorContext)

  const onSubmitHandler = async (e) =>{
    e.preventDefault()

    try {
        if(state === 'Admin') {
            const {data} = await axios.post(backendUrl+'/api/admin/login',{email,password})
            if(data.success){
                console.log(data.token);
                localStorage.setItem('aToken',data.token)
                setAToken(data.token)
                
            } else {
                toast.error(data.message)
            }
        } else {
          const {data} = await axios.post(backendUrl+'/api/doctor/login', {email, password})
          if(data.success){
            console.log(data.token);
            localStorage.setItem('dToken',data.token)
            setDToken(data.token)
            
            
        } else {
            toast.error(data.message)
        }
        }
    } catch (error) {
        
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <p className="text-2xl font-semibold text-gray-800 text-center mb-6">
          <span className="text-indigo-500">{state}</span> Login
        </p>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            id="password"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
        >
          Login
        </button>
        {
            state === 'Admin'
            ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=> setState('Doctor')}>Click here</span></p>
            : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=> setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;


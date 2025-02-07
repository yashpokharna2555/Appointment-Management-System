import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useState } from 'react';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [page,setPage] = useState(1);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="w-full px-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">All Doctors</h1>
      <div className="grid grid-cols-3 gap-6">
        {doctors.slice(page*6 - 6,6).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 mb-4"
            />
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
            <div className="mt-4 flex items-center">
              <input
                onChange={() => changeAvailability(item._id)}
                type="checkbox"
                checked={item.available}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                readOnly
              />
              <label className="ml-2 text-sm text-gray-600">Available</label>
            </div>
          </div>
        ))}
      </div>
      {doctors.length > 0 && (
        <div className='p-2 my-4 flex justify-center'>
          
          <span>◀️</span>
          {[...Array(Math.ceil(doctors.length / 6))].map((item,idx)=> (
            <span key={idx+1}>{idx+1}</span>
          ))}
          <span>▶️</span>
        </div>
      )}

    </div>


  );
};

export default DoctorsList;

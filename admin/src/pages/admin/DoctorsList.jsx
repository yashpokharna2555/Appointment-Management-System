import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
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
              <input onChange={() => changeAvailability(item._id)}
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
    </div>
  );
};

export default DoctorsList;

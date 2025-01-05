import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <p className="text-2xl font-semibold text-center text-gray-800 mb-6">My Appointments</p>
      <div className="space-y-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white shadow rounded-lg border border-gray-200"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-grow text-left">
              <p className="text-xl font-bold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
              <div className="mt-2 text-sm text-gray-700">
                <p className="font-medium">Address:</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
              </div>
              <p className="mt-4 text-sm text-gray-700">
                <span className="font-medium">Date and Time:</span>{' '}
                <span className="text-blue-500">25 Jul 2001</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
                Pay Online
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;

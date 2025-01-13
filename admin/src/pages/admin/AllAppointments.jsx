import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets.js';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // const handleCancel = (appointmentId) => {
  //   if (window.confirm('Are you sure you want to cancel this appointment?')) {
  //     cancelAppointment(appointmentId);
  //   }
  // };

  return (
    <div className="w-full p-4 bg-gray-50 shadow-md rounded-lg">
      <p className="text-2xl font-semibold text-center text-gray-800 mb-6">All Appointments</p>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm uppercase font-medium text-left">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment, index) => {
                const dob = appointment.userData?.dob;
                const age = dob ? calculateAge(dob) : 'N/A';

                return (
                  <tr
                    key={appointment._id}
                    className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 flex items-center">
                      <img
                        src={appointment.userData?.image || '/default-patient.png'}
                        alt="Patient"
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                      {appointment.userData?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{age}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {appointment.slotDate} | {appointment.slotTime}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 flex items-center">
                      <img
                        src={appointment.docData?.image || '/default-doctor.png'}
                        alt="Doctor"
                        className="w-6 h-6 rounded-full mr-2 object-cover"
                      />
                      {appointment.docData?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">${appointment.amount}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 flex items-center">
                      {appointment.payment ? (
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full mr-2">Paid</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full mr-2">Unpaid</span>
                      )}


                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {appointment.cancelled
                        ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                        : item.isCompleted
                          ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                          : <button onClick={() => cancelAppointment(appointment._id)} title="Cancel Appointment">
                            <img
                              src={assets.cancel_icon}
                              alt="Cancel"
                              className="w-10 cursor-pointer"
                            />
                          </button>
                      }
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-3 text-center text-sm text-gray-600">
                  No appointments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;

import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments(); // Fetch appointments only if token exists
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* Table Body */}
        {appointments && appointments.length > 0 ? (
          appointments.reverse().map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={item._id || index}
            >
              {/* Index */}
              <p className="max-sm:hidden">{index + 1}</p>

              {/* Patient Name */}
              <div className="flex items-center gap-2">
                {item.userData?.image ? (
                  <img className="w-8 rounded-full" src={item.userData.image} alt="Patient" />
                ) : (
                  <span className="w-8 h-8 bg-gray-200 rounded-full"></span>
                )}
                <p>{item.userData?.name || 'N/A'}</p>
              </div>

              {/* Payment */}
              <div>
                <p className="text-xs inline border border-primary px-2 rounded-full">
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>

              {/* Age */}
              <p className="max-sm:hidden">{item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>

              {/* Date & Time */}
              <p>
                {item.slotDate ? slotDateFormat(item.slotDate) : 'N/A'},{' '}
                {item.slotTime || 'N/A'}
              </p>

              {/* Fee */}
              <p>{item.amount ? `${currency}${item.amount}` : 'N/A'}</p>

              {/* Actions */}
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-5">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;

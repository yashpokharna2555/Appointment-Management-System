import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dashData, setDashData, getDashData, completeAppointment, cancelAppointment, dToken } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="flex flex-col h-full p-5 bg-gray-50">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex items-center gap-2 bg-white p-4 rounded shadow hover:scale-105 transition-transform">
            <img className="w-14" src={assets.earning_icon} alt="Earnings" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{currency} {dashData.earnings}</p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded shadow hover:scale-105 transition-transform">
            <img className="w-14" src={assets.appointment_icon} alt="Appointments" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded shadow hover:scale-105 transition-transform">
            <img className="w-14" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white mt-10 flex-1 rounded shadow">
          <div className="flex items-center gap-2.5 px-4 py-4 border-b">
            <img src={assets.list_icon} alt="Bookings" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="overflow-y-auto max-h-[60vh]">
            {dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                  <img className="rounded-full w-10" src={item.userData.image} alt="Patient" />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">{item.userData.name}</p>
                    <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">Completed</p>
                  ) : (
                    <div className="flex">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-8 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-8 cursor-pointer"
                        src={assets.tick_icon}
                        alt="Complete"
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No bookings available.</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;

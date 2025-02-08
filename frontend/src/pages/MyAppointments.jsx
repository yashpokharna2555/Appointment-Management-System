import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('Dummy Key');

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, slotDateFormatUser } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePaymentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closePaymentModal = () => {
    setSelectedAppointment(null);
    getUserAppointments(); // Refresh appointments after payment
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <p className="text-2xl font-semibold text-center text-gray-800 mb-6">My Appointments</p>
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white shadow rounded-lg border border-gray-200"
          >
            <div className="flex-shrink-0">
              <img
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>
            <div className="flex-grow text-left">
              <p className="text-xl font-bold text-gray-800">{item.docData.name}</p>
              <p className="text-sm text-gray-600">{item.docData.speciality}</p>
              <p className="mt-4 text-sm text-gray-700">
                <span className="font-medium">Date and Time:</span> {slotDateFormatUser(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-4 md:mt-0">
              {item.payment ? (
                <>
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Paid: ${item.amount}
                  </button>
                </>
              ) : (
                <>
                  {!item.cancelled && (
                    <>
                      <button
                        onClick={() => handlePaymentClick(item)}
                        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                      >
                        Pay Online
                      </button>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </>
              )}
              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
            </div>


          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <p className="text-lg font-bold mb-4">Pay for {selectedAppointment.docData.name}</p>
            <Elements stripe={stripePromise}>
              <PaymentForm
                appointment={selectedAppointment}
                backendUrl={backendUrl}
                token={token}
                onSuccess={closePaymentModal}
              />
            </Elements>
            <button
              onClick={closePaymentModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

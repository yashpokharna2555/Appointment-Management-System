import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Pie } from 'react-chartjs-2'; // Import Pie chart
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

import { assets } from '../../assets/assets_admin/assets.js';

const Dashboard = () => {
  const {
    aToken,
    getDashData,
    cancelAppointment,
    dashData,
    getEarningsData,
    earningsChartData, // Access `earningsChartData` from context
  } = useContext(AdminContext);

  const [chartData, setChartData] = useState(null); // State for Pie chart data

  const fetchEarningsData = async () => {
    try {
      await getEarningsData(); // Fetch data and store in context
    } catch (error) {
      console.error('Error fetching earnings data:', error);
    }
  };

  useEffect(() => {
    if (aToken) {
      getDashData();
      fetchEarningsData(); // Fetch earnings data for the chart
    }
  }, [aToken]);

  useEffect(() => {
    if (earningsChartData) {
      const labels = earningsChartData.map((item) => item.doctorName);
      const data = earningsChartData.map((item) => item.earnings);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Earnings by Doctor',
            data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      });
    }
  }, [earningsChartData]); // Trigger update when earningsChartData changes

  return dashData && (
    <div className="m-5">
      {/* Dashboard Summary */}
      <div className="flex flex-wrap gap-3">
        <SummaryCard
          icon={assets.doctor_icon}
          count={dashData.doctors}
          label="Doctors"
        />
        <SummaryCard
          icon={assets.appointment_icon}
          count={dashData.appointments}
          label="Appointments"
        />
        <SummaryCard
          icon={assets.patients_icon}
          count={dashData.patients}
          label="Patients"
        />
        <SummaryCard
          icon={assets.earning_icon}
          count={dashData.earnings}
          label="Earnings"
        />
      </div>

      {/* Earnings Pie Chart */}
      <div className="bg-white mt-10 p-6 rounded border">
        <h3 className="text-lg font-semibold mb-4">Earnings by Doctor</h3>
        {chartData ? (
          <Pie data={chartData} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      {/* Latest Appointments */}
      <div className="bg-white mt-10">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.map((item, index) => (
            <AppointmentItem
              key={index}
              appointment={item}
              cancelAppointment={cancelAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Summary Card Component
const SummaryCard = ({ icon, count, label }) => (
  <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={icon} alt="" />
    <div>
      <p className="text-xl font-semibold text-gray-600">{count}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  </div>
);

// Reusable Appointment Item Component
const AppointmentItem = ({ appointment, cancelAppointment }) => (
  <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
    <img className="rounded-full w-10" src={appointment.docData.image} alt="" />
    <div className="flex-1 text-sm">
      <p className="text-gray-800 font-medium">{appointment.docData.name}</p>
      <p className="text-gray-600">{appointment.slotDate}</p>
    </div>
    {appointment.cancelled ? (
      <p className="text-red-400 text-xs font-medium">Cancelled</p>
    ) : appointment.isCompleted ? (
      <p className="text-green-500 text-xs font-medium">Completed</p>
    ) : (
      <button
        onClick={() => cancelAppointment(appointment._id)}
        title="Cancel Appointment"
      >
        <img
          src={assets.cancel_icon}
          alt="Cancel"
          className="w-10 cursor-pointer"
        />
      </button>
    )}
  </div>
);

export default Dashboard;

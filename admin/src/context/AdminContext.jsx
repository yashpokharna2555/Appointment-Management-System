import axios from "axios";
import { useState, createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem('aToken') || ''
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [earningsChartData, setEarningsChartData] = useState(false);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/all-doctors',
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/admin/dashboard',
        { headers: { aToken } }
      );
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getEarningsData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/admin/dashboard-chart',
        { headers: { aToken } }
      );
      if (data.success) {
        setEarningsChartData(data.earningsChartData);
      } else {
        toast.error("Failed to load earnings data");
      }
    } catch (error) {
      toast.error("Failed to load earnings data");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/cancel-appointment',
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    appointments,
    setAppointments,
    getDashData,
    cancelAppointment,
    getEarningsData,
    dashData,
    earningsChartData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

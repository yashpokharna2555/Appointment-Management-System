import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();
import axios from 'axios';
import { toast } from 'react-toastify';

const AppContextProvider = ({ children }) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
            console.log(data);

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const slotDateFormatUser = (date) => {
        console.log(date);
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const split = date.split('_');
        const day = split[0];
        const monthIndex = parseInt(split[1], 10) - 1; // Convert month to 0-based index
        const year = split[2];

        const formattedDate = `${day} ${months[monthIndex]} ${year}`;
        return formattedDate;

    };


    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        slotDateFormatUser
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {


        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, backendUrl, setProfileData, getProfileData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const {data} = await axios.post(backendUrl+'/api/doctor/update-profile', updateData,{
        headers: { Authorization: `Bearer ${dToken}` },
      })

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  }
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 text-white flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={profileData.image}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              <p className="text-lg">{profileData.degree} - {profileData.speciality}</p>
              <p className="text-sm mt-2 text-blue-200 font-medium">
                {profileData.experience} Years of Experience
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-10">
            {/* About Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700">About</h2>
              <p className="text-gray-600 mt-2">{profileData.about}</p>
            </div>

            {/* Appointment Fee */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700">Appointment Fee</h2>
              <p className="text-gray-600 mt-2 text-xl font-medium">
                {currency}{' '}
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-24"
                  />
                ) : (
                  profileData.fees
                )}
              </p>
            </div>

            {/* Address */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700">Address</h2>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </>
              ) : (
                <>
                  <p className="text-gray-600 mt-2">{profileData.address.line1}</p>
                  {profileData.address.line2 && (
                    <p className="text-gray-600">{profileData.address.line2}</p>
                  )}
                </>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                id="available"
                className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
                checked={profileData.available}
                disabled={!isEdit}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, available: e.target.checked }))
                }
              />
              <label htmlFor="available" className="text-gray-700 font-medium">
                Available
              </label>
            </div>

            {/* Edit/Save Button */}
            <div className="text-center">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;

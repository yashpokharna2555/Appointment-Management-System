import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';

const MyProfile = () => {
  const {userData, setUserData,token, backendUrl,loadUserProfileData} = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  console.log("My profile user data", userData);

  const [image,setImage] = useState(false)

  const updateUserProfile = async () =>{
    // youtube 9:55 - 10:15
  }
  
  return userData && (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex flex-col items-center gap-4">
        <img
          className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
          src={userData.image}
          alt="Profile"
        />
        {isEdit ? (
          <input
            className="w-full text-center bg-gray-100 text-3xl font-medium mt-4 p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="text-3xl font-bold text-gray-800">{userData.name}</p>
        )}
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="text-left">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h2>
        <p className="text-gray-600">Email: {userData.email}</p>
        <p className="text-gray-600 mt-2">Phone:</p>
        {isEdit ? (
          <input
            className="w-full bg-gray-100 p-2 mt-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={userData.phone}
            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
          />
        ) : (
          <p className="text-gray-700">{userData.phone}</p>
        )}
        <p className="text-gray-600 mt-4">Address:</p>
        {isEdit ? (
          <div className="space-y-2">
            <input
              className="w-full bg-gray-100 p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={userData.address.line1}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
            />
            <input
              className="w-full bg-gray-100 p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={userData.address.line2}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
            />
          </div>
        ) : (
          <p className="text-gray-700">
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
        )}
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="text-left">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>
        <p className="text-gray-600">Gender:</p>
        {isEdit ? (
          <select
            className="w-full bg-gray-100 p-2 mt-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userData.gender}
            onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <p className="text-gray-700">{userData.gender}</p>
        )}
        <p className="text-gray-600 mt-4">Birthday:</p>
        {isEdit ? (
          <input
            className="w-full bg-gray-100 p-2 mt-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            value={userData.dob}
            onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
          />
        ) : (
          <p className="text-gray-700">{userData.dob}</p>
        )}
      </div>

      <div className="mt-6 text-center">
        {isEdit ? (
          <button
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            onClick={() => setIsEdit(false)}
          >
            Save Info
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

import React, { useEffect, useState } from 'react';
import nav_logo from '../../assets/nav_logo.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/appContext.jsx';
import { useAdminContext } from '../../context/adminAppContext.jsx';

const Admin = () => {
  const { theme, navigate } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const { adminLoginValue } = useAdminContext();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/getallusers');
      if (!data) {
        toast.error('No data received from server');
      } else {
        setUserData(data.profiles);
      }
    } catch (error) {
      toast.error('Some error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminLoginValue) {
      fetchUserData();
    }
  }, [adminLoginValue]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/logout');
      if (!data.success) {
        toast.error(`Some Error Occurred: ${data.message}`);
      } else {
        toast.success('Logged out successfully');
        navigate('/home');
      }
    } catch (error) {
      toast.error(`Some Error Occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/user/delete', { id: userId });
      if (!data.success) {
        toast.error(`Some Error Occurred: ${data.message}`);
      } else {
        toast.success('User deleted successfully');
        fetchUserData();
      }
    } catch (error) {
      toast.error(`Some Error Occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Navbar */}
      <div
        className={`flex items-center justify-between px-6 py-4 mb-6 rounded-lg shadow 
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center space-x-4">
          <img src={nav_logo} alt="Logo" className="w-14 h-14 object-contain" />
          <h1 className="text-xl font-semibold pl-150">Admin Panel</h1>
        </div>
        <button className="text-red-500 hover:underline" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Heading */}
      <div className="text-center text-2xl font-bold mb-4">Find All Developers and Delete</div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table
          className={`min-w-full rounded-lg shadow 
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        >
          <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">User ID</th>
              <th className="px-6 py-3 text-left font-semibold">Profile Created At</th>
              <th className="px-6 py-3 text-left font-semibold">Delete User</th>
              <th className="px-6 py-3 text-left font-semibold">Visit Profile</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((data) => (
              <tr
                key={data._id}
                className={`border-t ${
                  theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                <td className="px-6 py-3">{data.name}</td>
                <td className="px-6 py-3 break-all">{data._id}</td>
                <td className="px-6 py-3">{new Date(data.createdAt).toLocaleString()}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => deleteUser(data._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => navigate(`/profile/${data._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Visit Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p onClick={() => navigate('/home')} className="flex justify-center py-4 cursor-pointer text-blue-500 underline">
        Go to Home
      </p>
    </div>
  );
};

export default Admin;

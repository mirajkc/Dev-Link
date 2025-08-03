import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const ProfileSetting = () => {
  const { userData, theme, navigate } = useAppContext();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [protfolio, setProtfolio] = useState('');
  const [profilepic, setProfilepic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

 useEffect(() => {
  if (userData) {
    setName(userData.name || '');
    setDescription(userData.description || '');
    setProtfolio(userData.protfolio || '');
    setProfilepic(null);
    setPreviewImage(userData.profilePic || null); // Note: profilePic (consistent with your backend field)
  }
}, [userData]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilepic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilepic(null);
      setPreviewImage(userData?.data?.profilePicture || null);
    }
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Name is required', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', name);
      
      // Only append password if it's not empty
      if (password.trim()) {
        formData.append('password', password);
      }
      
      formData.append('description', description || '');
      formData.append('protfolio', protfolio || '');

      // Only append profile picture if a new file is selected
      if (profilepic && profilepic instanceof File) {
        formData.append('profilePicture', profilepic);
      }
      
      const response = await axios.post('/api/user/update', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      });
      
      const { data } = response;

      // Check for successful response
      if (response.status === 200 && data) {
        toast.success(data.message || 'Profile updated successfully', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000',
          },
        });
        
        setPassword(''); // Clear password field after successful update
      } else {
        throw new Error(data?.message || 'Update failed - no data received');
      }

    } catch (error) {
      // Error handling
      if (error.response) {
        // Server responded with error status
        toast.error(error.response.data?.message || `Server error: ${error.response.status}`, {
          duration: 4000,
          position: 'top-center',
        });
      } else if (error.request) {
        // Request was made but no response received
        toast.error('Network error - please check your connection', {
          duration: 4000,
          position: 'top-center',
        });
      } else {
        // Something else happened
        toast.error(error.message || 'An unexpected error occurred', {
          duration: 4000,
          position: 'top-center',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className={`rounded-lg p-6 mb-8 shadow-sm border transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <h1 className="text-3xl font-bold mb-2">User Settings</h1>
          <p className={`text-lg transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Update your profile information and manage your account settings
          </p>
        </div>

        {/* Profile Form */}
        <div className={`rounded-lg shadow-sm border transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <form onSubmit={handleFormData} className="p-6 space-y-6">
            {/* Profile Picture Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold mb-2">
                Profile Picture
              </label>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Image Preview */}
                <div className="flex-shrink-0">
                  <div className={`w-24 h-24 rounded-full overflow-hidden border-2 transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700' 
                      : 'border-gray-300 bg-gray-100'
                  }`}>
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* File Input */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'text-gray-300 file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600'
                        : 'text-gray-700 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100'
                    }`}
                  />
                  <p className={`mt-1 text-xs transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    PNG, JPG, GIF up to 10MB. Leave empty to keep current image.
                  </p>
                  {userData?.data?.profilePicture && !profilepic && (
                    <p className={`mt-1 text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      Currently using your existing profile picture
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Enter your full name"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Leave blank to keep current password"
              />
              <p className={`text-xs transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Only fill this if you want to change your password
              </p>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none resize-vertical ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Portfolio Field - Fixed typo */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Portfolio
              </label>
              <textarea
                value={protfolio}
                onChange={(e) => setProtfolio(e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none resize-vertical ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Share your portfolio details, links, or achievements..."
              />
            </div>

            {/* Submit Button */}
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-300 focus:ring-2 focus:outline-none ${
                  loading
                    ? theme === 'dark'
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : theme === 'dark'
                      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                } ${!loading && 'transform hover:scale-105 active:scale-95'}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="32"
                        strokeDashoffset="32"
                      />
                    </svg>
                    Updating...
                  </div>
                ) : (
                  'Update Profile'
                )}
              </button >
            </div>
          </form>
          <div className='pl-6 mb-4' >
            <p>Looking for your project settings ? <span className='underline text-blue-500  cursor-pointer' onClick={()=>navigate('/projects')} >Click Here </span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
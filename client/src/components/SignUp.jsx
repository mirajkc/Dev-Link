import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/appContext';
import axios from 'axios';

const SignUp = () => {
  const { theme, navigate } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formHandler = async (e) => {
    e.preventDefault();
    if (!image || !name || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      const { data } = await axios.post('/api/user/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data) {
        toast.success(data.message);
        navigate('/home');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      <div className={`w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm border ${
        theme === 'dark' 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/90 border-gray-200/50'
      }`}>
        <form onSubmit={formHandler} className="space-y-5 sm:space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Create Account
            </h2>
            <p className={`text-sm sm:text-base ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Join us and get started today
            </p>
          </div>

          {/* Profile Picture Upload */}
          <div className="space-y-2">
            <label className={`block text-sm sm:text-base font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Profile Picture *
            </label>
            <div className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 transition-colors hover:border-opacity-80 ${
              theme === 'dark' 
                ? 'border-gray-600 bg-gray-800/50 hover:border-blue-400' 
                : 'border-gray-300 bg-gray-50 hover:border-blue-400'
            }`}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer`}
              />
              <div className="text-center">
                <div className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <svg className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {image ? image.name : 'Click to upload image'}
                </p>
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 sm:space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className={`block text-sm sm:text-base font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 sm:py-4 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 text-sm sm:text-base ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/30 focus:ring-offset-gray-900' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400/30 focus:ring-offset-white'
                }`}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className={`block text-sm sm:text-base font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 sm:py-4 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 text-sm sm:text-base ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/30 focus:ring-offset-gray-900' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400/30 focus:ring-offset-white'
                }`}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className={`block text-sm sm:text-base font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Password *
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className={`w-full px-4 py-3 sm:py-4 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 text-sm sm:text-base ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/30 focus:ring-offset-gray-900' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400/30 focus:ring-offset-white'
                }`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 sm:py-4 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-gray-900 disabled:hover:bg-blue-600'
                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white disabled:hover:bg-blue-600'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Login Link */}
          <div className={`text-center pt-4 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`text-sm sm:text-base ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className={`font-medium underline transition-colors hover:no-underline ${
                  theme === 'dark' 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
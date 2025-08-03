import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useAdminContext } from '../../context/adminAppContext';

const AdminLogin = () => {
  const { theme, navigate } = useAppContext();
  const {
    username,
    setUsername,
    password,
    setPassword,
    adminLoginValue,
    loading,
    loginUser,
    autoLogin
  } = useAdminContext();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl ${
        theme === 'dark'
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Login
          </h2>
          <p className={`mt-2 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Sign in to your admin account
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
              theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
            }`}></div>
            <p className={`mt-4 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Loading...
            </p>
          </div>
        ) : (
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              loginUser();
            }}
          >
            <div className="space-y-4">
              {/* Username Field */}
              <div>
                <label 
                  htmlFor="username" 
                  className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 sm:text-sm transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400 focus:ring-offset-gray-800'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-white'
                  }`}
                  placeholder="Please enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 sm:text-sm transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400 focus:ring-offset-gray-800'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-white'
                  }`}
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400 focus:ring-offset-gray-800'
                    : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white'
                }`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className={`h-5 w-5 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                    } group-hover:text-blue-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
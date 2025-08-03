import React, { useState } from 'react';
import { useAppContext } from '../context/appContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const { login, setLogin, navigate, theme , fetchUserData, authenticate} = useAppContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/user/login', { email, password });
      if (data) {
        toast.success(data.message);
        setLogin(true);
        navigate('/home');
        const isAuthenticated = await authenticate()
        if(isAuthenticated){
          await fetchUserData();
          navigate('/home')
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
        <form onSubmit={handleForm} className="space-y-5 sm:space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome Back
            </h2>
            <p className={`text-sm sm:text-base ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Sign in to your DevLink account
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 sm:space-y-5">
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
                placeholder="Enter your password"
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
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Sign Up Link */}
          <div className={`text-center pt-4 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`text-sm sm:text-base ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              New to DevLink?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className={`font-medium underline transition-colors hover:no-underline ${
                  theme === 'dark' 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Create an account
              </button>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className={`mt-6 sm:mt-8 pt-4 border-t text-center ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={`text-xs sm:text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            By signing in, you agree to our{' '}
            <button
              type="button"
              className={`underline transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-500'
              }`}
            >
              Terms of Service
            </button>
            {' '}and{' '}
            <button
              type="button"
              className={`underline transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-500'
              }`}
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
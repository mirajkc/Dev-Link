import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import LikeDislike from '../components/LikeDislike';
import MyProfileProject from '../components/MyProfileProject';
import Comments from '../components/Comments';

const MyProfile = () => {
  const { theme, navigate } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'projects'
  const { id } = useParams();

  const getUserData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user/getById/${id}`);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setProfile(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getUserData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Profile Section */}
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className={`rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8 transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Profile Image */}
              <div className="relative">
                <img 
                  className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-full object-cover border-4 border-blue-500 shadow-lg transition-transform duration-300 hover:scale-105" 
                  src={profile.profilePic} 
                  alt="profile" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
              </div>

              {/* Profile Info */}
              <div className="space-y-4 w-full">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hi I'm {profile.name}
                </h1>
                
                {/* Like/Dislike Component */}
                <div className="flex justify-center py-2">
                  <LikeDislike id={id} />
                </div>

                {/* Description */}
                <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {profile.description || 'No description provided yet.'}
                </p>

                {/* Profile Creation Date */}
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Member since {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'Unknown'}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={`rounded-xl shadow-lg mb-6 overflow-hidden ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <nav className="flex">
              {['portfolio', 'projects', 'comments'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 text-center font-semibold capitalize transition-all duration-300 relative overflow-hidden ${
                    activeTab === tab
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-500 text-white shadow-lg'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="relative z-10">{tab}</span>
                  {activeTab === tab && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className={`rounded-xl shadow-lg transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            {activeTab === 'portfolio' ? (
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6 ">
                  <div className={`w-1 h-8 rounded-full mr-4 ${
                    theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                  }`}></div>
                  <h2 className="text-2xl font-bold">Portfolio</h2>
                </div>
                <div className={`prose max-w-none ${
                  theme === 'dark' ? 'prose-invert' : ''
                }`}>
                  <p className={`whitespace-pre-wrap text-base sm:text-lg leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {profile.protfolio || 'No portfolio information provided yet. This section will showcase the user\'s work, achievements, and professional journey.'}
                  </p>
                </div>
              </div>
            ) : activeTab === 'projects' ? (
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-1 h-8 rounded-full mr-4 ${
                    theme === 'dark' ? 'bg-purple-500' : 'bg-purple-600'
                  }`}></div>
                  <h2 className="text-2xl font-bold">Projects</h2>
                </div>
                <MyProfileProject id={id}  />
              </div>
            ): (
              <Comments id={id} />
            )}
          </div>

          <div className={`mt-8 p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 ${
  theme === 'dark' 
    ? 'bg-gray-800 border border-gray-700 text-gray-300' 
    : 'bg-white border border-gray-200 text-gray-700'
}`}>
  <div className="flex items-center mb-4">
    <div className={`w-1 h-8 rounded-full mr-4 ${
      theme === 'dark' ? 'bg-green-500' : 'bg-green-600'
    }`}></div>
    <h2 className="text-2xl font-bold">Contact Me</h2>
  </div>
  <p className="text-base sm:text-lg leading-relaxed font-medium">
    Contact Me At:
  </p>
  <p className="text-base sm:text-lg">{profile.email || 'Not available'}</p>
</div>


        </div>

      </div>
    </div>
  );
};

export default MyProfile;
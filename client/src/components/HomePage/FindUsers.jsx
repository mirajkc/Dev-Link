import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const FindUsers = () => {
  const { theme, navigate } = useAppContext();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch developers (limit to 4)
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/getallusers');
      if (data?.profiles?.length > 0) {
        setUserData(data.profiles.slice(0, 4));
      } else {
        toast.error('No developer data found');
      }
    } catch (error) {
      toast.error('Something went wrong: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Theming & Style Variants
  const containerStyles = theme === 'dark'
    ? 'bg-gray-900 text-white'
    : 'bg-gray-50 text-gray-900';

  const cardStyles = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:shadow-gray-800/50'
    : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-gray-200/80';

  const buttonStyles = theme === 'dark'
    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400';

  const emailStyles = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${containerStyles}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center py-10 sm:py-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Find Top Developers
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Browse and connect with talented developers from around the community.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-medium">Fetching developers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {userData.map((dev) => (
              <div
                key={dev._id}
                onClick={() => navigate(`/profile/${dev._id}`)}
                className={`group cursor-pointer rounded-2xl p-5 sm:p-6 border shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.02] hover:-translate-y-1 duration-300 ${cardStyles}`}
              >
                {/* Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl h-48 sm:h-52">
                  <img
                    src={dev.profilePic}
                    alt={dev.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold truncate group-hover:text-blue-600 transition-colors duration-200">
                    {dev.name}
                  </h3>
                  <p className={`text-sm truncate ${emailStyles}`}>{dev.email}</p>
                  <p className="text-sm leading-relaxed min-h-[3.5rem]">
                    {dev.description?.length > 80
                      ? dev.description.slice(0, 80) + '...'
                      : dev.description || 'No description available.'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Joined{' '}
                    {new Date(dev.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${dev._id}`);
                  }}
                  className={`mt-4 w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonStyles}`}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}

        {/* No Developers */}
        {!loading && userData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">👨‍💻</div>
            <h3 className="text-2xl font-semibold mb-2">No Developers Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no developers to display at the moment. Try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindUsers;

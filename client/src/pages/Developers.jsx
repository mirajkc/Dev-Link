import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/appContext';

const Developers = () => {
  const { theme, navigate } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  //* get the user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/getallusers');
      if (!data) {
        toast.error("No data received from server");
      } else {
        setUserData(data.profiles);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Some error occurred: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Theme-based styles
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
  const dateStyles = theme === 'dark' ? 'text-gray-500' : 'text-gray-500';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${containerStyles}`}>
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Find All The Developers
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover talented developers in our community
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-medium">Loading developers...</p>
          </div>
        ) : (
          /* Developers Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-8">
            {userData.map((data) => (
              <div
                key={data._id}
                onClick={() => navigate(`/profile/${data._id}`)}
                className={`
                  group cursor-pointer rounded-2xl p-5 sm:p-6 
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300 ease-in-out 
                  border transform hover:scale-[1.02] hover:-translate-y-1
                  ${cardStyles}
                `}
              >
                {/* Profile Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={data.profilePic}
                    alt={data.name}
                    className="w-full h-40 sm:h-44 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Developer Info */}
                <div className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold truncate group-hover:text-blue-600 transition-colors duration-200">
                    {data.name}
                  </h2>

                  <p className={`text-xs sm:text-sm font-medium truncate ${emailStyles}`}>
                    {data.email}
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed min-h-[3rem]">
                    {data.description?.length > 80
                      ? data.description.slice(0, 80) + '...'
                      : data.description || 'No description available'}
                  </p>

                  <p className={`text-xs font-medium ${dateStyles}`}>
                    Joined {new Date(data.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${data._id}`);
                    }}
                    className={`
                      w-full py-2.5 sm:py-3 px-4 rounded-lg 
                      font-semibold text-sm sm:text-base
                      text-white transition-all duration-200 
                      transform hover:scale-[1.02] active:scale-[0.98]
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${buttonStyles}
                    `}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && userData.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl sm:text-6xl mb-4">👨‍💻</div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">No Developers Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              It looks like there are no developers to display at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Developers;
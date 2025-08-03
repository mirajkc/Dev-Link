import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Search = () => {
  const { theme, navigate } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) {
      toast.error('Search field can’t be empty');
      navigate('/home');
    }
  }, [query, navigate]);

  const fetchSearchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user/search?query=${query}`);
      setUsers(data.users);
    } catch (error) {
      toast.error(`Some error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) fetchSearchData();
  }, [query]);

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 md:px-12 lg:px-16 py-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <p className="text-2xl font-bold">Showing results for "{query}"</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{users.length} result(s) found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-8">
            {users.map((data) => (
              <div
                key={data._id}
                onClick={() => navigate(`/profile/${data._id}`)}
                className={`
                  group cursor-pointer rounded-2xl p-5 sm:p-6 
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300 ease-in-out 
                  border transform hover:scale-[1.02] hover:-translate-y-1
                  ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}
                `}
              >
                {/* Profile Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={data.profilePic || '/default-profile.png'}
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

                  <p className="text-xs sm:text-sm font-medium truncate text-gray-500 dark:text-gray-400">
                    {data.email}
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed min-h-[3rem]">
                    {data.description?.length > 80
                      ? data.description.slice(0, 80) + '...'
                      : data.description || 'No description available'}
                  </p>

                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    Joined{' '}
                    {new Date(data.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${data._id}`);
                    }}
                    className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm sm:text-base text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

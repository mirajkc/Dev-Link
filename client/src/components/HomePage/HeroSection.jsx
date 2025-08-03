import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { useAppContext } from '../../context/appContext.jsx';

const HeroSection = () => {
  const { theme } = useAppContext();
  const [query, setQuery] = useState(''); // ✅ Use local state for search input
  const navigate = useNavigate(); // ✅ React Router navigation hook

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`); // ✅ Navigate to URL
    }
  };

  return (
    <div>
      <section
        className={`relative py-12 sm:pb-16 lg:pb-20 xl:pb-24 ${
          theme === 'dark' ? 'bg-[#101828]' : 'bg-white'
        }`}
      >
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            {/* Text Content */}
            <div>
              <h1
                className={`text-4xl font-semibold sm:text-5xl lg:text-6xl xl:text-7xl ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                Connecting Developers with Developers
              </h1>
              <p
                className={`mt-4 text-lg sm:mt-8 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}
              >
                DevLink is a space to share your work, explore others’ projects,
                and grow as a developer through collaboration.
              </p>

              <form
                className="relative mt-8 rounded-full sm:mt-12"
                onSubmit={handleSearch} // ✅ Form submit handler
              >
                <div className="relative">
                  <div className="absolute rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                      <svg
                        className={`w-5 h-5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Try Searching Developer Name."
                      className={`block w-full py-4 pr-6 placeholder-gray-500 border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0 ${
                        theme === 'dark'
                          ? 'bg-[#101828] text-white'
                          : 'bg-white text-black'
                      }`}
                    />
                  </div>
                </div>

                <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                  <button
                    type="submit"
                    className={`inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest uppercase transition-all duration-200 rounded-full sm:w-auto sm:py-3 ${
                      theme === 'dark'
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'bg-black text-white hover:bg-gray-900'
                    }`}
                  >
                    Find A Developer
                  </button>
                </div>
              </form>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0">
                <svg
                  className="blur-3xl filter opacity-70"
                  style={{ filter: 'blur(64px)' }}
                  width="444"
                  height="536"
                  viewBox="0 0 444 536"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                    fill="url(#c)"
                  />
                  <defs>
                    <linearGradient
                      id="c"
                      x1="82.7339"
                      y1="550.792"
                      x2="-39.945"
                      y2="118.965"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute inset-0">
                <img
                  className="object-cover w-full h-full opacity-40"
                  src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png"
                  alt="Noise Texture"
                />
              </div>
              <img
                className="relative w-full max-w-md mx-auto"
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/2/illustration.png"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

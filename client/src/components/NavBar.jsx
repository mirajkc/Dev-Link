import React, { useState, useRef, useEffect } from 'react';
import nav_logo from '../assets/nav_logo.png';
import { useAppContext } from '../context/appContext';
import { Search, User, Menu, X, ChevronDown } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const NavBar = () => {
  const { theme, navigate, location, login, setLogin , userData } = useAppContext();
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

   // Hide navbar on home page
  if (location.pathname === '/') return null;
  if (location.pathname === '/login') return null;
  if (location.pathname === '/signup') return null;
  if(location.pathname.startsWith('/admin')) return null;

  const handleSearch = (e) => {
  if (e.key === 'Enter' && search.trim()) {
    navigate(`/search?query=${search.trim()}`);
    scrollTo(0,0)
    setSearch('');
  }
};


  const handleSearchClick = () => {
    if (search.trim()) {
      navigate(`/search/query?=${search.trim()}`);
      setSearch('');
    }
  };

  const handleLogout = async() => {
    try {
      const {data} = await axios.get('/api/user/logout')
      if(data){
        toast.success(data.message)
       setLogin(false);
       setIsUserDropdownOpen(false);
      navigate('/');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  const profile_pic =  userData.profilePic;

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Find Developers', path: '/developers' },
    { name: 'Community', path: '/community' },
    { name: 'Admin', path: '/admin' },
    { name: 'About Us', path: '/about' }
  ];

  const id = userData._id;

  const userMenuItems = [
    { name: 'My Profile', path: `/profile/${id}`, icon: null },
    { name: 'Settings', path: '/settings', icon: null },
    { name: 'My Projects', path: '/projects', icon: null },
    { name: 'Community', path: '/community', icon: null },
    { name: 'Logout', action: handleLogout, icon: null, className: 'text-red-500 hover:text-red-600' }
  ];

  const baseTheme = theme === 'dark'
    ? 'bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 text-gray-100 border-gray-700'
    : 'bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 border-gray-200';

  return (
    <nav className={`w-full sticky top-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ${baseTheme}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div
              className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() =>{navigate('/'); scrollTo(0,0)}}
            >
              <img 
                src={nav_logo} 
                alt="DevLink Logo" 
                className="h-8 w-auto sm:h-10 object-contain"
              />
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search for developers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                className={`w-full pl-4 pr-12 py-2.5 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-800/80 text-white border-gray-600 placeholder-gray-400 hover:bg-gray-700/80'
                    : 'bg-white/80 text-gray-900 border-gray-300 placeholder-gray-500 hover:bg-white'
                } backdrop-blur-sm`}
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors duration-200 hover:bg-blue-500 hover:text-white"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {navigate(link.path); scrollTo(0,0)}}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === link.path
                    ? 'bg-blue-500 text-white shadow-md'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center ml-6">
            {login ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700/50 text-gray-300'
                      : 'hover:bg-gray-100/50 text-gray-700'
                  }`}
                >
                  <img src={profile_pic} className='w-8 h-8 rounded-full'  alt="" />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border backdrop-blur-sm transition-all duration-200 ${
                  isUserDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                } ${
                  theme === 'dark'
                    ? 'bg-gray-800/95 border-gray-700'
                    : 'bg-white/95 border-gray-200'
                }`}>
                  <div className="py-2">
                    {userMenuItems.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          if (item.action) {
                            item.action();
                          } else {
                            navigate(item.path);
                            setIsUserDropdownOpen(false);
                          };
                          scrollTo(0,0)
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 hover:bg-opacity-50 ${
                          item.className || (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105 ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                    : 'border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white hover:border-blue-500'
                } shadow-sm`}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-2">
            
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search for developers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                className={`w-full pl-4 pr-12 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400'
                    : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
                }`}
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors duration-200 hover:bg-blue-500 hover:text-white"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {navigate(link.path);scrollTo(0,0)}}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </button>
            ))}

            {/* Mobile User Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 bg-gray-800 ">
              {login ? (
                <div className="space-y-2">
                  {userMenuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          navigate(item.path);
                        };
                        scrollTo(0,0)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors duration-200 ${
                        item.className || (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className={`w-full px-4 py-3 rounded-lg text-base font-medium border transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white'
                      : 'border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
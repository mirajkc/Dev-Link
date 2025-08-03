import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppContext } from '../context/appContext';

const Footer = () => {
  const location = useLocation();
  const { theme } = useAppContext();
  
  if (location.pathname === "/seller") {
    return null;

  }if (location.pathname === "/login") {
    return null;
  }

  if (location.pathname === "/signup") {
    return null;
  }

  if(location.pathname.startsWith('/admin')){
    return null;
  }

  const bgClass = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' 
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100';
  const textBaseClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textHeadingClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const borderClass = theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50';
  const logoClass = theme === 'dark' 
    ? 'bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-gray-700/50' 
    : 'bg-gradient-to-r from-blue-100/80 to-green-100/80 border border-gray-200/50';

  return (
    <footer className={`${bgClass} transition-all duration-500 relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-5 ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'}`} />
        <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-5 ${theme === 'dark' ? 'bg-green-500' : 'bg-green-300'}`} />
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 py-16 border-b border-gray-500/20">
          
          {/* Brand Section */}
          <div className="lg:w-1/3">
            <div className={`w-36 h-16 ${logoClass} rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-300 ease-out shadow-lg backdrop-blur-sm mb-6`}>
              <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-bold text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent`}>
                DevLink
              </span>
            </div>
            <p className={`${textBaseClass} leading-relaxed text-lg mb-6`}>
              DevLink is a full-stack web platform dedicated to developers. Our mission is to empower 
              developers by providing an easy-to-use space to build personalized portfolios, showcase 
              their work, and engage with peers through social features.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Quick Links */}
            <div>
              <h3 className={`font-bold text-lg ${textHeadingClass} mb-6 relative`}>
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/home' },
                  { name: 'Search Developers', path: '/home' },
                  { name: 'Create Portfolio', path: '/settings' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact', path: '/about' }
                ].map(({ name, path }) => (
                  <li key={name}>
                    <Link 
                      to={path}
                      onClick={()=>scrollTo(0,0)}
                      className={`${textBaseClass} hover:text-blue-500 transition-all duration-300 
                        hover:translate-x-2 inline-block group relative`}
                    >
                      <span className="group-hover:text-blue-500 transition-colors duration-300">▶</span>
                      <span className="ml-2">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer Resources */}
            <div>
              <h3 className={`font-bold text-lg ${textHeadingClass} mb-6 relative`}>
                Developer Resources
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Project Showcase', path: '/projects' },
                  { name: 'Developer Community', path: '/community' },
                  { name: 'Find Developers', path: '/developers' },
                ].map(({ name, path }) => (
                  <li key={name}>
                    <Link 
                      to={path}
                      onClick={()=>scrollTo(0,0)}
                      className={`${textBaseClass} hover:text-green-500 transition-all duration-300 
                        hover:translate-x-2 inline-block group relative`}
                    >
                      <span className="group-hover:text-green-500 transition-colors duration-300">▶</span>
                      <span className="ml-2">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className={`font-bold text-lg ${textHeadingClass} mb-6 relative`}>
                Support & Legal
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Help Center', path: '/about' },
                  { name: 'Privacy Policy', path: '/about' },
                  { name: 'Terms of Service', path: '/about' },
                  { name: 'Cookie Policy', path: '/about' },
                  { name: 'Report Issue', path: '/about' }
                ].map(({ name, path }) => (
                  <li key={name}>
                    <Link 
                      to={path}
                      onClick={()=>scrollTo(0,0)}
                      className={`${textBaseClass} hover:text-purple-500 transition-all duration-300 
                        hover:translate-x-2 inline-block group relative`}
                    >
                      <span className="group-hover:text-purple-500 transition-colors duration-300">▶</span>
                      <span className="ml-2">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className={`${textBaseClass} text-center md:text-left`}>
            <p className="text-lg font-medium">
              © 2025 DevLink. All rights reserved.
            </p>
            <p className="text-sm mt-1">
              Built with ❤️ by developers, for developers
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 ${textBaseClass}`}>
              <span className="text-green-500">●</span>
              <span className="text-sm">All systems operational</span>
            </div>
            <div className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'} 
              backdrop-blur-sm border ${borderClass}`}>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
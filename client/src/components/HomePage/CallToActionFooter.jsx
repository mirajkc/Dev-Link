import React from 'react';
import { useAppContext } from '../../context/appContext';

const CallToActionFooter = () => {
  const { theme, navigate } = useAppContext();

  // Action items data
  const ctaActions = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      title: "Create Account",
      description: "Join our community of talented developers",
      buttonText: "Sign Up Now",
      buttonAction: () => navigate('/login'),
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "from-blue-600 to-blue-700"
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Upload Project",
      description: "Showcase your work and get discovered",
      buttonText: "Upload Now",
      buttonAction: () => navigate('/projects'),
      gradient: "from-purple-500 to-purple-600",
      hoverGradient: "from-purple-600 to-purple-700"
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Explore Developers",
      description: "Connect with amazing talent worldwide",
      buttonText: "Start Exploring",
      buttonAction: () => navigate('/developers'),
      gradient: "from-green-500 to-green-600",
      hoverGradient: "from-green-600 to-green-700"
    }
  ];

  // Theming & Style Variants (matching other components)
  const containerStyles = theme === 'dark'
    ? 'bg-gray-900 text-white'
    : 'bg-gray-50 text-gray-900';

  const cardStyles = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:shadow-gray-800/50'
    : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-gray-200/80';

  const descriptionStyles = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`transition-colors duration-300 ${containerStyles}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="py-16 sm:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers who are already building, sharing, and growing their careers with us.
            </p>
          </div>

          {/* CTA Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {ctaActions.map((action) => (
              <div
                key={action.id}
                className={`group cursor-pointer rounded-2xl p-6 sm:p-8 border shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] hover:-translate-y-1 duration-300 ${cardStyles}`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${action.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {action.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${descriptionStyles}`}>
                    {action.description}
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    action.buttonAction();
                  }}
                  className={`mt-6 w-full py-3 px-6 rounded-xl font-semibold text-white text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 bg-gradient-to-r ${action.gradient} hover:bg-gradient-to-r hover:${action.hoverGradient} transform hover:scale-105 active:scale-95`}
                >
                  {action.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Secondary CTA Banner */}
          <div className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700' 
              : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-gray-200'
          }`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Don't Wait - Your Next Opportunity Awaits!
              </h3>
              <p className={`text-base sm:text-lg mb-8 max-w-2xl mx-auto ${descriptionStyles}`}>
                Whether you're looking to hire talent, showcase your skills, or collaborate on exciting projects, 
                everything starts with taking that first step.
              </p>

              {/* Primary CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => navigate('/developers')}
                  className={`px-8 py-4 font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 focus:ring-gray-500'
                      : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 focus:ring-gray-500'
                  }`}
                >
                  Browse Developers
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                10+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Active Developers
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                5+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Projects Shared
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                5+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Connections Made
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                99%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                User Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionFooter;
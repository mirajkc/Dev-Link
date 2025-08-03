import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';

const NewsLetter = () => {
  const { theme } = useAppContext();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call - replace with your actual subscription logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Successfully subscribed to our Dev Link!');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Theming & Style Variants (matching other components)
  const containerStyles = theme === 'dark'
    ? 'bg-gray-900 text-white'
    : 'bg-gray-50 text-gray-900';

  const cardStyles = theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-200';

  const inputStyles = theme === 'dark'
    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500';

  const buttonStyles = theme === 'dark'
    ? 'bg-black hover:bg-gray-900 text-white'
    : 'bg-gray-900 hover:bg-black text-white';

  const privacyTextStyles = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`transition-colors duration-300 ${containerStyles}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          {/* Newsletter Card */}
          <div className="flex justify-center">
            <div className={`flex flex-col items-center w-full max-w-4xl rounded-2xl px-6 py-12 md:py-16 border shadow-lg ${cardStyles}`}>
              
              {/* Header */}
              <div className="flex flex-col justify-center items-center text-center mb-8">
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  } text-white`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Stay Inspired
                </h2>
                <p className={`text-sm md:text-base mt-2 max-w-2xl mx-auto leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Join our Dev Link and be the first to discover new updates, exclusive developer resources, 
                  project showcases, and inspiration from our growing community.
                </p>
              </div>

              {/* Subscription Form */}
              <form onSubmit={handleSubscribe} className="w-full max-w-md">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`px-4 py-3 border rounded-xl outline-none w-full transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputStyles}`}
                    placeholder="Enter your email address"
                    disabled={loading}
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 group px-6 md:px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${buttonStyles}`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Privacy Notice */}
              <p className={`mt-6 text-xs text-center max-w-lg ${privacyTextStyles}`}>
                By subscribing, you agree to our{' '}
                <button className="underline hover:text-blue-600 transition-colors">
                  Privacy Policy
                </button>{' '}
                and consent to receive updates about new features, developer spotlights, and community highlights.
              </p>

              {/* Features List */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Weekly Updates
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Exclusive Content
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    No Spam Ever
                  </span>
                </div>
              </div>

              {/* Subscriber Count */}
              <div className="mt-8 text-center">
                <p className={`text-sm ${privacyTextStyles}`}>
                  Join <span className="font-semibold text-blue-600 dark:text-blue-400">50+</span> developers 
                  who are already subscribed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
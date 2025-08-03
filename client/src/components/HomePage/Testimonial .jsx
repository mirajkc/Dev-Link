import React from 'react';
import { useAppContext } from '../../context/appContext';

const Testimonial = () => {
  const { theme } = useAppContext();

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full Stack Developer",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "This platform helped me connect with amazing developers and showcase my projects to a wider audience. The community here is incredibly supportive!",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Frontend Developer",
      company: "InnovateX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "Finding talented collaborators for my open-source projects has never been easier. The quality of developers on this platform is outstanding.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Backend Engineer",
      company: "DataFlow",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "I've built meaningful professional relationships and learned so much from the diverse community of developers here. Highly recommended!",
      rating: 5
    },
    {
      id: 4,
      name: "David Park",
      role: "DevOps Engineer",
      company: "CloudTech",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "The project discovery feature is fantastic! I've found several exciting projects to contribute to and met some brilliant minds.",
      rating: 5
    }
  ];

  // Theming & Style Variants (matching other components)
  const containerStyles = theme === 'dark'
    ? 'bg-gray-900 text-white'
    : 'bg-gray-50 text-gray-900';

  const cardStyles = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:shadow-gray-800/50'
    : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-gray-200/80';

  const quoteStyles = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const roleStyles = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${containerStyles}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center py-10 sm:py-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            What Developers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Hear from our amazing community of developers who have found success on our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`group cursor-pointer rounded-2xl p-5 sm:p-6 border shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.02] hover:-translate-y-1 duration-300 ${cardStyles}`}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Testimonial Quote */}
              <div className="mb-6">
                <p className={`text-sm leading-relaxed ${quoteStyles} italic`}>
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Name and Role */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {testimonial.name}
                  </h4>
                  <p className={`text-xs truncate ${roleStyles}`}>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Verified Developer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="text-center py-10 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                10+
              </div>
              <div className={`text-sm ${roleStyles}`}>Happy Developers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
                50+
              </div>
              <div className={`text-sm ${roleStyles}`}>Projects Showcased</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                98%
              </div>
              <div className={`text-sm ${roleStyles}`}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
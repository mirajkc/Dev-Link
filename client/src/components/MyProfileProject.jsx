import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/appContext';

const MyProfileProject = ({ id }) => {
  const { theme, navigate } = useAppContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/project/get-project/${id}`);
      if (!data.success) {
        toast.error(data.message);
        return;
      } else {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      toast.error(error.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className={`text-lg font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-700/50 border border-gray-600' 
          : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
          }`}>
            <svg className={`w-8 h-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              No Projects Yet
            </h3>
            <p className={`text-base ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              This user hasn't uploaded any projects to showcase.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Projects Count Header */}
      <div className="flex items-center justify-between">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          theme === 'dark' 
            ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
            : 'bg-purple-100 text-purple-700 border border-purple-200'
        }`}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {projects.length} Project{projects.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={project._id}
            className={`group rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border relative ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50'
                : 'bg-white border-gray-200 hover:border-purple-300'
            }`}
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            {/* Project Image */}
            <div className="relative overflow-hidden">
              <img
                src={project.projectImage}
                alt={project.projectName}
                className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200/6B7280/FFFFFF?text=Project+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Project Link Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-semibold text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-white hover:shadow-lg"
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project
                </a>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 space-y-4">
              {/* Project Title */}
              <div className="space-y-2">
                <h3 className={`text-xl font-bold leading-tight transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white group-hover:text-purple-300' : 'text-gray-900 group-hover:text-purple-600'
                }`}>
                  {project.projectName}
                </h3>
                
                {/* Project Description */}
                <p className={`text-sm leading-relaxed line-clamp-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.projectDescription?.length > 120 
                    ? `${project.projectDescription.substring(0, 120)}...`
                    : project.projectDescription || 'No description available.'
                  }
                </p>
              </div>

              {/* Project Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className={`flex items-center text-xs font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(project.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center text-sm font-semibold transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-purple-400 hover:text-purple-300' 
                      : 'text-purple-600 hover:text-purple-500'
                  }`}
                >
                  Visit
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Gradient Border Effect */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20' 
                : 'bg-gradient-to-r from-purple-500/10 to-blue-500/10'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Add Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MyProfileProject;
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/appContext.jsx'

const FetchProject = () => {
  const { theme, navigate } = useAppContext()
  
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState([])

  const getProjectData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/project/get')
      if (data.success) {
        setProject(data.projects)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getProjectData() }, [])

  const deleteProject = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/project/delete/${id}`);
      
      if (data.success) {
        toast.success(data.message || "Project deleted successfully.");
        // Refresh the project list
        getProjectData();
      } else {
        toast.error(data.message || "Failed to delete project.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
          theme === 'dark' 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400' 
            : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600'
        }`}>
          Your Projects
        </h2>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {project.length} project{project.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto ${
              theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
            }`}></div>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Loading projects...
            </p>
          </div>
        </div>
      ) : project.length === 0 ? (
        /* Empty State */
        <div className={`text-center py-20 rounded-2xl border-2 border-dashed ${
          theme === 'dark' 
            ? 'border-gray-700 bg-gray-800/20' 
            : 'border-gray-300 bg-gray-50/50'
        }`}>
          <div className={`text-6xl mb-4 ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            📂
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            No Projects Found
          </h3>
          <p className={`${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Create your first project to get started!
          </p>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.map((data, index) => (
            <div
              key={data._id}
              className={`group rounded-2xl shadow-xl border transition-all duration-500 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 hover:border-gray-600' 
                  : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/50 hover:border-gray-300'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Project Image */}
              {data.projectImage && (
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={data.projectImage}
                    alt={data.projectName}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                    theme === 'dark' ? 'from-black/80 to-transparent' : 'from-black/50 to-transparent'
                  }`}></div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-6 space-y-4">
                {/* Project Name */}
                <div>
                  <h3 className={`text-xl font-bold mb-1 line-clamp-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {data.projectName}
                  </h3>
                  <div className={`h-1 w-12 rounded-full ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}></div>
                </div>

                {/* Project Description */}
                <p className={`text-sm leading-relaxed line-clamp-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {data.projectDescription}
                </p>

                {/* Project Link */}
                {data.projectLink && (
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      🔗
                    </span>
                    <a
                      href={data.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium hover:underline transition-colors duration-300 truncate ${
                        theme === 'dark' 
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      View on GitHub
                    </a>
                  </div>
                )}

                {/* Created Date */}
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Created: {new Date(data.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-opacity-20 border-gray-500">
                  {/* GitHub Link Button */}
                  {data.projectLink && (
                    <a
                      href={data.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 px-4 py-2 rounded-xl text-center text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        theme === 'dark'
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30 hover:bg-blue-600/30'
                          : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      GitHub
                    </a>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteProject(data._id)}
                    disabled={loading}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      theme === 'dark'
                        ? 'bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30'
                        : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center space-x-1">
                        <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                      </span>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FetchProject
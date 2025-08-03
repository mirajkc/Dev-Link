import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/appContext.jsx';
import FetchProject from '../components/FetchProject.jsx';

const Project = () => {
  const { theme } = useAppContext();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [projectLink, setProjectLink] = useState('');
  const [loading, setLoading] = useState(false);

  const projectHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('projectDescription', projectDescription);
    formData.append('projectLink', projectLink);
    formData.append('projectImage', projectImage);

    try {
      const { data } = await axios.post('/api/project/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.success) {
        toast.success(data.message || 'Project created');
        // Reset form fields
        setProjectName('');
        setProjectDescription('');
        setProjectLink('');
        setProjectImage(null);
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}>
            Projects Dashboard
          </h1>
          <p className={`text-lg md:text-xl ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Create and manage your amazing projects
          </p>
        </div>

        {/* Create Project Form */}
        <div className={`mb-12 rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className={`px-6 py-4 border-b rounded-t-2xl ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-700/50 to-gray-800/50 border-gray-700' 
              : 'bg-gradient-to-r from-gray-50/50 to-gray-100/50 border-gray-200'
          }`}>
            <h2 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Create New Project
            </h2>
          </div>
          
          <form onSubmit={projectHandler} className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Name */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="Enter project name"
                />
              </div>

              {/* Project Link */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Project Link (GitHub)
                </label>
                <input
                  type="url"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            {/* Project Description */}
            <div className="mt-6 space-y-2">
              <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Project Description
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:outline-none resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="Describe your project..."
              />
            </div>

            {/* Project Image */}
            <div className="mt-6 space-y-2">
              <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Project Image
              </label>
              <div className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-gray-600 hover:border-gray-500 bg-gray-700/20'
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProjectImage(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="p-8 text-center">
                  <div className={`text-4xl mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    📁
                  </div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {projectImage ? projectImage.name : 'Click to upload image or drag and drop'}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500/50'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500/50'
                } shadow-xl`}
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </span>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Fetch Projects Component */}
        <FetchProject />
      </div>
    </div>
  );
};

export default Project;
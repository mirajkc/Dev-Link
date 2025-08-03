import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/appContext';

const FindProject = () => {
  const { theme } = useAppContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/project/getallproject');
      if (!data?.projects || data.projects.length === 0) {
        toast.error('No projects found');
        setProjects([]);
      } else {
        setProjects(data.projects.slice(0, 4));
      }
    } catch (error) {
      toast.error('Something went wrong: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  // Theming & Style Variants (matching FindDevelopers)
  const containerStyles = theme === 'dark'
    ? 'bg-gray-900 text-white'
    : 'bg-gray-50 text-gray-900';

  const cardStyles = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:shadow-gray-800/50'
    : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-gray-200/80';

  const buttonStyles = theme === 'dark'
    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400';

  const deleteButtonStyles = theme === 'dark'
    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    : 'bg-red-600 hover:bg-red-700 focus:ring-red-400';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${containerStyles}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center py-10 sm:py-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Explore Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Check out some of the top open-source and portfolio projects by developers.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-medium">Fetching projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {projects.map((project) => (
              <div
                key={project._id}
                className={`group cursor-pointer rounded-2xl p-5 sm:p-6 border shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.02] hover:-translate-y-1 duration-300 ${cardStyles}`}
              >
                {/* Project Image */}
                {project.projectImage && (
                  <div className="relative mb-4 overflow-hidden rounded-xl h-48 sm:h-52">
                    <img
                      src={project.projectImage}
                      alt={project.projectName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold truncate group-hover:text-blue-600 transition-colors duration-200">
                    {project.projectName}
                  </h3>
                  
                  <p className="text-sm leading-relaxed min-h-[3.5rem]">
                    {project.projectDescription?.length > 80
                      ? project.projectDescription.slice(0, 80) + '...'
                      : project.projectDescription || 'No description available.'}
                  </p>

                  {project.projectLink && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 truncate">
                      🔗 View on GitHub
                    </p>
                  )}

                  <p className="text-xs text-gray-500">
                    Created{' '}
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-4 space-y-2">
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`block w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 text-center ${buttonStyles}`}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Projects */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold mb-2">No Projects Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no projects to display at the moment. Start by adding some!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindProject;
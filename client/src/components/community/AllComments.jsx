import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppContext } from '../../context/appContext'
import toast from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'

const AllComments = ({ id }) => {
  const { theme } = useAppContext()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAllComments = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/community/getallcomments/${id}`)
      if (data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllComments()
  }, [id])

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className={`mb-6 pb-3 border-b-2 ${
        theme === 'dark' 
          ? 'border-gray-700' 
          : 'border-gray-200'
      }`}>
        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${
          theme === 'dark' 
            ? 'text-white' 
            : 'text-gray-900'
        }`}>
          {comments.length > 0 
            ? `All Comments (${comments.length})` 
            : 'No Comments Yet'
          }
        </h2>
        {comments.length > 0 && (
          <p className={`text-sm mt-1 ${
            theme === 'dark' 
              ? 'text-gray-400' 
              : 'text-gray-600'
          }`}>
            Join the conversation below
          </p>
        )}
      </div>

      {loading ? (
        <div className={`flex flex-col items-center justify-center py-12 px-4 rounded-xl border-2 border-dashed ${
          theme === 'dark' 
            ? 'border-gray-600 bg-gray-800/50' 
            : 'border-gray-300 bg-gray-50/50'
        }`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className={`text-base font-medium ${
            theme === 'dark' 
              ? 'text-gray-300' 
              : 'text-gray-600'
          }`}>
            Loading comments...
          </p>
        </div>
      ) : comments.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-16 px-6 rounded-xl border-2 border-dashed ${
          theme === 'dark' 
            ? 'border-gray-600 bg-gray-800/30' 
            : 'border-gray-300 bg-gray-50/30'
        }`}>
          <div className={`text-4xl mb-4 ${
            theme === 'dark' 
              ? 'text-gray-500' 
              : 'text-gray-400'
          }`}>
            💬
          </div>
          <p className={`text-lg font-semibold mb-2 ${
            theme === 'dark' 
              ? 'text-gray-300' 
              : 'text-gray-700'
          }`}>
            No comments yet
          </p>
          <p className={`text-sm text-center ${
            theme === 'dark' 
              ? 'text-gray-500' 
              : 'text-gray-600'
          }`}>
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {comments.map((comment, index) => (
            <div
              key={comment._id}
              className={`group flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-750 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >


              {/* Profile Pic */}
              <div className="flex-shrink-0">
                <img
                  src={comment.commentBy.profilePic}
                  alt={comment.commentBy.name}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 transition-all duration-300 group-hover:ring-4 ${
                    theme === 'dark' 
                      ? 'ring-gray-600 group-hover:ring-blue-500/30' 
                      : 'ring-gray-300 group-hover:ring-blue-400/30'
                  }`}
                />
                {/* Online status indicator */}
                <div className={`w-3 h-3 rounded-full border-2 -mt-3 ml-8 sm:ml-10 ${
                  theme === 'dark' 
                    ? 'bg-green-400 border-gray-800' 
                    : 'bg-green-500 border-white'
                }`}></div>
              </div>

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                  <h3 className={`font-semibold text-sm sm:text-base truncate ${
                    theme === 'dark' 
                      ? 'text-white' 
                      : 'text-gray-900'
                  }`}>
                    {comment.commentBy.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-xs sm:text-sm font-medium ${
                      theme === 'dark' 
                        ? 'text-gray-400' 
                        : 'text-gray-500'
                    }`}>
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                    {/* New comment indicator */}
                    {new Date() - new Date(comment.createdAt) < 24 * 60 * 60 * 1000 && (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        theme === 'dark' 
                          ? 'bg-green-900/50 text-green-300 border border-green-700' 
                          : 'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                        NEW
                      </span>
                    )}
                  </div>
                </div>
                
                <div className={`p-3 sm:p-4 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-900/50 border border-gray-700' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    theme === 'dark' 
                      ? 'text-gray-200' 
                      : 'text-gray-700'
                  }`}>
                    {comment.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllComments
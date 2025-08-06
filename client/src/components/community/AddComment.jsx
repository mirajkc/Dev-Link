import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAppContext } from '../../context/appContext'

const AddComment = ({ id }) => {
  const { theme } = useAppContext()
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const addNewComment = async (e) => {
    e.preventDefault()
 
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/community/createcomment/${id}`, { comment })
      toast.success(data.message)
      window.location.reload()
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }
    
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className={`w-full max-w-3xl rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 border-2 ${
        theme === 'dark' 
          ? 'bg-gray-800 text-white border-gray-700 shadow-gray-900/50' 
          : 'bg-white text-gray-900 border-gray-200 shadow-gray-200/50'
      }`}>
                 
        {/* Heading Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-1 h-8 rounded-full ${
              theme === 'dark' 
                ? 'bg-blue-500' 
                : 'bg-blue-600'
            }`}></div>
            <h2 className={`text-2xl sm:text-3xl font-bold ${
              theme === 'dark' 
                ? 'text-white' 
                : 'text-gray-900'
            }`}>
              Add New Comment
            </h2>
          </div>
          <p className={`text-sm sm:text-base ml-4 ${
            theme === 'dark' 
              ? 'text-gray-400' 
              : 'text-gray-600'
          }`}>
            Share your thoughts with the community. Only logged-in users can comment.
          </p>
        </div>
         
        {/* Form Container */}
        <div className={`rounded-xl p-6 sm:p-8 border ${
          theme === 'dark' 
            ? 'bg-gray-900/50 border-gray-700' 
            : 'bg-gray-50/50 border-gray-200'
        }`}>
          <form onSubmit={addNewComment} className="space-y-6">
            <div>
              <label 
                htmlFor="comment" 
                className={`block text-sm sm:text-base font-semibold mb-3 ${
                  theme === 'dark' 
                    ? 'text-gray-200' 
                    : 'text-gray-700'
                }`}
              >
                Your Comment *
              </label>
              <div className="relative">
                <textarea
                  id="comment"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts, ask questions, or provide feedback..."
                  disabled={loading}
                  maxLength={500}
                  className={`w-full rounded-xl p-4 sm:p-5 border-2 resize-none transition-all duration-300 focus:outline-none focus:ring-4 text-sm sm:text-base leading-relaxed ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-500/30 focus:border-blue-500 placeholder-gray-400 hover:border-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-500 hover:border-gray-400'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {/* Character count overlay */}
                <div className={`absolute bottom-3 right-4 text-xs font-medium ${
                  comment.length > 450 
                    ? theme === 'dark' ? 'text-red-400' : 'text-red-500'
                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {comment.length}/500
                </div>
              </div>
            </div>
             
            {/* Form Footer */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-2">
              {/* Guidelines */}
              <div className={`text-xs sm:text-sm space-y-1 ${
                theme === 'dark' 
                  ? 'text-gray-400' 
                  : 'text-gray-500'
              }`}>
                <p className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                  }`}></span>
                  Be respectful and constructive
                </p>
                <p className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                  }`}></span>
                  Maximum 500 characters
                </p>
              </div>
               
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !comment.trim()}
                className={`px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform min-w-[140px] sm:min-w-[160px] ${
                  loading || !comment.trim()
                    ? theme === 'dark'
                      ? 'bg-gray-700 cursor-not-allowed text-gray-400 border-2 border-gray-600'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500 border-2 border-gray-200'
                    : theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105 border-2 border-blue-500 hover:border-blue-400'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105 border-2 border-blue-400 hover:border-blue-300'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className={`animate-spin rounded-full h-4 w-4 border-2 border-transparent mr-2 ${
                      theme === 'dark' 
                        ? 'border-t-gray-400' 
                        : 'border-t-gray-500'
                    }`}></div>
                    <span className="hidden sm:inline">Posting...</span>
                    <span className="sm:hidden">...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>💬</span>
                    <span>Post Comment</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Success Message Placeholder */}
        {comment.trim() && !loading && (
          <div className={`mt-6 p-4 rounded-lg border-l-4 ${
            theme === 'dark' 
              ? 'bg-green-900/20 border-green-500 text-green-300' 
              : 'bg-green-50 border-green-500 text-green-700'
          }`}>
            <p className="text-sm font-medium">Ready to post! Your comment looks great.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddComment
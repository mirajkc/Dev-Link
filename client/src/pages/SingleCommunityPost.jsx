import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import AddComment from '../components/community/AddComment'
import AllComments from '../components/community/AllComments'

const SingleCommunityPost = () => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [post, setPost] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  //* get the details about the post
  const fetchDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/community/getsinglepost/${id}`)
      if (data) {
        setPost(data.post)
      } else {
        return toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  //* verify if the owner is true or not 
  const verifyOwner = async () => {
    try {
      const { data } = await axios.get(`/api/community/verifyowner/${id}`)
      if (!data) {
        setIsOwner(false)
      }
      setIsOwner(true)
    } catch (error) {
      setIsOwner(false)
    }
  }

  //* delete the post
  const deletePost = async () => {
    try {
      const { data } = await axios.delete(`/api/community/deletepost/${id}`)
      if (!data) {
        return toast.error("Failed to delete post")
      }
      toast.success(data.message)
      navigate('/community')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchDetails()
    verifyOwner()
  }, [])

  return (
    <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'} min-h-screen transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {loading ? (
          <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-center`}>
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
              <span className="text-lg font-medium">Loading post...</span>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Post Card */}
            <article className={`${theme === 'dark' 
              ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700 shadow-xl shadow-gray-900/20' 
              : 'bg-white/80 backdrop-blur-sm border-gray-200 shadow-xl shadow-gray-900/10'
            } border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl`}>
              
              {/* Post Header */}
              <div className={`${theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b px-6 sm:px-8 py-6`}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={post?.postedBy?.profilePic}
                      alt="User profile"
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-4 ring-white/20 shadow-lg"
                    />
                    <div className={`${theme === 'dark' ? 'bg-green-500' : 'bg-green-400'} absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} text-lg sm:text-xl font-bold truncate`}>
                      {post?.postedBy?.name}
                    </h2>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>
                      {new Date(post?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 sm:px-8 py-8">
                <div className="space-y-6">
                  <h1 className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight`}>
                    {post?.title}
                  </h1>
                  <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-base sm:text-lg leading-relaxed prose prose-lg max-w-none`}>
                    <p className="whitespace-pre-wrap">{post?.post}</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="space-y-6">
              <AllComments id={id} />
              <AddComment id={id} />
              
            </div>

            {/* Delete Button for Owner */}
            {isOwner && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={deletePost}
                  className={`${theme === 'dark' 
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500/50 text-white' 
                    : 'bg-red-500 hover:bg-red-600 focus:ring-red-500/30 text-white'
                  } inline-flex items-center px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 shadow-lg hover:shadow-xl`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleCommunityPost
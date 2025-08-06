import React from 'react'
import { useAppContext } from '../../context/appContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const AllPost = () => {
  const {theme} = useAppContext();
  const [posts , setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const fetchProjectData  = async() => {
    try {

      setLoading(true)
      const {data} = await axios.get('/api/community/getallposts')

      if(data){
        setPosts(data.posts)
      }else if(!data){
        return toast.error(data.message)
      }
      
    } catch (error) {
      return toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{fetchProjectData()},[])

  return (
    <div className={`min-h-screen py-6 px-4 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        {
          loading ? (
            <div className={`flex items-center justify-center min-h-64 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="text-center">
                <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 mb-4 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'}`}></div>
                <h1 className="text-lg font-medium">Loading posts...</h1>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header Section */}
              <div className={`text-center pb-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Recent Posts
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {posts.length} {posts.length === 1 ? 'post' : 'posts'} available
                </p>
              </div>

              {/* Posts Grid */}
              <div className="grid gap-6 md:gap-8">
                {
                  posts.map((post)=>(
                    <div key={post._id} className={`rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                    
                      {/* Profile Picture and Name Section */}
                      <div className="p-4 pb-3 flex items-center space-x-3">
                        <img 
                          onClick={()=>navigate(`/profile/${post.postedBy._id}`)}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-offset-2 transition-all duration-200 hover:ring-4 hover:ring-offset-4 ring-blue-500 ring-offset-transparent" 
                          src={post.postedBy.profilePic}
                          alt={`${post.postedBy.name}'s profile`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {post.postedBy.name}
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Title and Content Section */}
                      <div className="px-4 pb-4">
                        <h2 
                         onClick={()=>navigate(`/community/post/${post._id}`)}
                        className={`text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {post.title}
                        </h2>
                        
                        <p className={`text-sm leading-relaxed mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {post.post.length >= 100 ? post.post.slice(0,100) + '...' : post.post}
                        </p>

                        {/* Post Stats */}
                        <div className={`flex items-center justify-between pt-3 border-t text-xs ${theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            <span>{post.comments.length} comments</span>
                          </span>
                          
                          <button 
                          onClick={()=>navigate(`/community/post/${post._id}`)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'}`}>
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

              {/* Empty State */}
              {posts.length === 0 && (
                <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg className={`mx-auto h-12 w-12 mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7" />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                  <p className="text-sm">Be the first to share something with the community!</p>
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default AllPost
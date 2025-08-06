import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import CreateCommunutyPost from '../components/community/CreateCommunutyPost'
import AllPost from '../components/community/AllPost'

const Community = () => {
  const { theme } = useAppContext()
  const [newPost, setNewpost] = useState(false)

  const newPostHandler = () => {
    setNewpost(true)
  }

  const cancelNewPost = () => {
    setNewpost(false)
  }

  return (
    <div
      className={` border transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-700 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      
      <div className="text-center my-4 space-y-1 mb-6">
        <h1 className="text-3xl font-bold">DevLink Community</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Create and explore the community posts
        </p>
      </div>

      
      <div className="flex justify-center mb-6">
        {!newPost ? (
          <button
            onClick={newPostHandler}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            Create New Post
          </button>
        ) : (
          <button
            onClick={cancelNewPost}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            Cancel
          </button>
        )}
      </div>

     
      {newPost && <CreateCommunutyPost />}
      <AllPost />
    </div>
  )
}

export default Community

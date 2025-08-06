import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateCommunityPost = () => {
  const { theme } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [communityPost, setCommunityPost] = useState('')

  const postCommunityData = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data } = await axios.post('/api/community/create', { title, communityPost })

      if (!data?.success) {
        return toast.error(data.message)
      }

      toast.success(data.message)
      setTitle('')
      setCommunityPost('')
      window.location.reload();

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`max-w-xl mx-auto mt-10 p-6 rounded shadow-md mb-10 ${
        theme === 'dark'
          ? 'bg-gray-800 text-white'
          : 'bg-white text-neutral-900 border border-gray-200'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create a Community Post</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form onSubmit={postCommunityData}>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter the post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 mt-1 mb-4 rounded-md border focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white border-gray-300 focus:ring-purple-500'
                  : 'bg-white text-black border-gray-300 focus:ring-blue-400'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Post Details</label>
            <textarea
              rows="5"
              placeholder="What's on your mind?"
              value={communityPost}
              onChange={(e) => setCommunityPost(e.target.value)}
              className={`w-full p-3 mt-1 mb-4 rounded-md border focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white border-gray-300 focus:ring-purple-500'
                  : 'bg-white text-black border-gray-300 focus:ring-blue-400'
              }`}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold hover:scale-104 transition-transform duration-300 ease-in-out ${
              theme === 'dark'
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Submit Post
          </button>
        </form>
      )}
    </div>
  )
}

export default CreateCommunityPost

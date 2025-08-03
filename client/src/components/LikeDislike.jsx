import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useAppContext } from '../context/appContext.jsx'

const LikeDislike = ({ id }) => {
  const { theme } = useAppContext()
  const [like, setLike] = useState(0)
  const [dislike, setDislike] = useState(0)
  const [isLiking, setIsLiking] = useState(false)
  const [isDisliking, setIsDisliking] = useState(false)

  const getLike = async () => {
    try {
      const { data } = await axios.get(`/api/likedislike/getlikes/${id}`)
      if (!data) {
        return toast.error('Failed to fetch the like count from the server')
      }
      setLike(data.likeCount)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDisLike = async () => {
    try {
      const { data } = await axios.get(`/api/likedislike/getdislikes/${id}`)
      if (!data) {
        return toast.error('Failed to fetch the dislike count from the server')
      }
      setDislike(data.dislikeCount)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendLikeData = async () => {
    setIsLiking(true)
    try {
      const { data } = await axios.post(`/api/likedislike/setlike/${id}`)
      if (!data) {
        return toast.error('Could not connect to the server')
      }
      if (data.success) {
        toast.success(data.message)
        getLike()
        getDisLike()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLiking(false)
    }
  }

  const sendDisLikeData = async () => {
    setIsDisliking(true)
    try {
      const { data } = await axios.post(`/api/likedislike/setdislike/${id}`)
      if (!data) {
        return toast.error('Could not connect to the server')
      }
      if (data.success) {
        toast.success(data.message)
        getLike()
        getDisLike()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsDisliking(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getLike()
      await getDisLike()
    }
    fetchData()
  }, [id])

  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto">
      {/* Like Counter Button */}
      <button
        onClick={sendLikeData}
        disabled={isLiking}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium
          transition-all duration-200 transform hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${theme === 'dark' 
            ? 'bg-green-900/20 hover:bg-green-900/40 text-green-400 focus:ring-green-500 focus:ring-offset-gray-800' 
            : 'bg-green-100 hover:bg-green-200 text-green-700 focus:ring-green-500 focus:ring-offset-white'
          }
          ${isLiking ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg cursor-pointer'}
        `}
      >
        {isLiking ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
            <span>{like}</span>
          </>
        ) : (
          <>
            <ThumbsUp size={16} />
            <span>{like}</span>
          </>
        )}
      </button>

      {/* Dislike Counter Button */}
      <button
        onClick={sendDisLikeData}
        disabled={isDisliking}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium
          transition-all duration-200 transform hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${theme === 'dark' 
            ? 'bg-red-900/20 hover:bg-red-900/40 text-red-400 focus:ring-red-500 focus:ring-offset-gray-800' 
            : 'bg-red-100 hover:bg-red-200 text-red-700 focus:ring-red-500 focus:ring-offset-white'
          }
          ${isDisliking ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg cursor-pointer'}
        `}
      >
        {isDisliking ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
            <span>{dislike}</span>
          </>
        ) : (
          <>
            <ThumbsDown size={16} />
            <span>{dislike}</span>
          </>
        )}
      </button>
    </div>
  )
}

export default LikeDislike
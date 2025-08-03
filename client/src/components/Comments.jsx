import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

const CommentItem = ({ comment, theme }) => (
  <div className={`flex space-x-4 p-4 rounded-md shadow-sm border ${
    theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
  }`}>
    <img
      src={comment?.sender?.profilePic || '/default-avatar.png'}
      alt={comment?.sender?.name || 'User avatar'}
      className="w-12 h-12 rounded-full object-cover"
      onError={(e) => { e.target.src = '/default-avatar.png'; }}
    />
    <div className="flex-1">
      <p className="font-semibold">{comment?.sender?.name || 'Unknown User'}</p>
      <p className="mt-1 whitespace-pre-wrap break-words">{comment?.content || 'No content'}</p>
      <p className="text-xs text-gray-400 mt-1">
        {comment?.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Unknown date'}
      </p>
    </div>
  </div>
);

const Comments = ({ id }) => {
  const { theme } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await axios.get(`/api/comment/get-comment/${id}`);
      if (response.data.success) {
        const commentsData = response.data.comment || [];
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } else {
        toast.error(response.data.message || 'Failed to fetch comments');
        setComments([]);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error fetching comments';
      toast.error(errorMessage);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    if (!id) {
      toast.error('No user ID provided');
      return;
    }
    try {
      setSubmitting(true);
      const response = await axios.post(`/api/comment/add-comment/${id}`, { content: newComment.trim() });
      if (response.data.success) {
        toast.success(response.data.message || 'Comment added successfully');
        setNewComment('');
        await fetchComments();
      } else {
        toast.error(response.data.message || 'Failed to add comment');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error adding comment';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  if (!id) {
    return (
      <div className={`max-w-3xl mx-auto p-4 rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <p className="text-red-500">Error: No user ID provided for comments</p>
      </div>
    );
  }

  return (
    <div className={`max-w-3xl mx-auto p-4 rounded-lg shadow-md ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading comments...</span>
        </div>
      ) : comments.length === 0 ? (
        <p className={`py-8 text-center ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} theme={theme} />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="comment" className="block font-medium">
          Add a Comment
        </label>
        <textarea
          id="comment"
          rows="4"
          className={`w-full rounded-md p-3 border focus:outline-none focus:ring-2 resize-none ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500 placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-600 placeholder-gray-500'
          }`}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          disabled={submitting}
          maxLength={500}
        />
        <div className="flex justify-between items-center">
          <span className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {newComment.length}/500 characters
          </span>
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${
              submitting || !newComment.trim()
                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                : theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {submitting ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </span>
            ) : (
              'Submit Comment'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;

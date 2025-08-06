import express from 'express'
import { authenticateUser } from '../middleware/authMiddleware.js'
import {
  createCommentOnPost,
  createPost,
  deletePostById,
  fetchCommentById,
  getAllPost,
  getPostById,
  postOwner
} from '../controller/communityController.js'

const communityRouter = express.Router()

// Create a new community post
communityRouter.post('/create', authenticateUser, createPost)

// Get all community posts
communityRouter.get('/getallposts', getAllPost)

// Verify post ownership
communityRouter.get('/verifyowner/:id', authenticateUser, postOwner)

// Delete a community post (use DELETE method)
communityRouter.delete('/deletepost/:id', authenticateUser, deletePostById)

// Add comment to a post
communityRouter.post('/createcomment/:id', authenticateUser, createCommentOnPost)

// Get all comments for a post
communityRouter.get('/getallcomments/:id', fetchCommentById)

// Get a single post by ID
communityRouter.get('/getsinglepost/:id', getPostById)

export default communityRouter

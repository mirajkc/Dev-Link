import express from 'express'
import { authenticateUser } from '../middleware/authMiddleware.js'
import { createComment, getCommentByID } from '../controller/commentContoller.js'

const commentRouter = express.Router()

//* Add a new comment (auth required)
commentRouter.post('/add-comment/:id', authenticateUser, createComment)

//* Get all comments for a user (no auth)
commentRouter.get('/get-comment/:id', getCommentByID)

export default commentRouter

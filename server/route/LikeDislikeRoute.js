import express from 'express'
import { authenticateUser } from '../middleware/authMiddleware.js';
import { fetchDislikesData, fetchLikesData, getDisliked, getLikes } from '../controller/LikeDislikeController.js';

const likedislikeRoute = express.Router();

//* like user: POST /api/likedislike/setlike/:id
likedislikeRoute.post('/setlike/:id', authenticateUser, getLikes);

//* dislike user: POST /api/likedislike/setdislike/:id
likedislikeRoute.post('/setdislike/:id', authenticateUser, getDisliked);

//* get like count: GET /api/likedislike/getlikes/:id
likedislikeRoute.get('/getlikes/:id', fetchLikesData);

//* get dislike count: GET /api/likedislike/getdislikes/:id
likedislikeRoute.get('/getdislikes/:id', fetchDislikesData);

export default likedislikeRoute;

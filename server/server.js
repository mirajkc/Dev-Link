import express from 'express'
import 'dotenv/config'
import connectDB from './config/connectDB.js';
import { connect } from 'mongoose';
import connectCloudinary from './config/cloudinary.js';
import cookieParser from 'cookie-parser';

import cors from 'cors'
import projectRouter from './route/projectRoute.js';
import userRouter from './route/userRoute.js';
import likedislikeRoute from './route/LikeDislikeRoute.js';
import commentRouter from './route/commentRoute.js';
import adminRoute from './route/adminRoute.js';
import communityRouter from './route/communityRoute.js';


const app = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT_NUMBER || 5000;


app.use(express.json())
app.use(cookieParser());
await connectDB();
await connectCloudinary();

const allowedOrigins = ['http://localhost:5173','https://dev-link-3nkhe39br-miraj-kcs-projects.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.get('/',(req,res)=>{
  res.send("Server Is Working")
})

app.use('/api/user', userRouter)
app.use('/api/project', projectRouter)
app.use('/api/likedislike', likedislikeRoute)
app.use('/api/comment', commentRouter)
app.use('/api/admin', adminRoute)
app.use('/api/community', communityRouter)


app.listen(port, ()=>{
  console.log(`Server Is Listening On http://localhost:${port}`);
})
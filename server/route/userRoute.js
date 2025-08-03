import express from 'express';
import multer from 'multer';
import { deleteUserByID, getAllProfile, getUser, getUserByID, login, logout, register, searchUser, updateUser } from '../controller/userController.js';
import { requestMonitor } from '../middleware/requestMonitor.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { checkAuthForStatus } from '../middleware/checkAuthForStatus.js';
import { adminAuth } from '../middleware/adminAuthMiddleware.js';
const userRouter = express.Router();
const storage = multer.memoryStorage(); // use in-memory buffer
const upload = multer({ storage });


userRouter.use(requestMonitor);

userRouter.post('/signup', upload.single('image'), register);
userRouter.post('/login', login);

userRouter.get('/authenticate', checkAuthForStatus, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    isAuthenticated: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    }
  });
});

userRouter.post('/update', authenticateUser, upload.single('profilePicture'), updateUser);
userRouter.get('/get', authenticateUser, getUser);
userRouter.get('/logout', authenticateUser , logout)


//get user from params 
userRouter.get('/getById/:id', getUserByID)



//* get all the users 
userRouter.get('/getallusers', getAllProfile)

//* delete user by id

userRouter.post('/delete',adminAuth,deleteUserByID)

//* search for the users 
userRouter.get('/search',searchUser)

export default userRouter;
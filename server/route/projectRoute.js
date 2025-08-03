import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { createProject, deleteProject, getAllProject, getById, getProjects } from '../controller/projectController.js';

const projectRouter = express.Router();

// Using multer with diskStorage (this works as long as your Cloudinary upload uses req.file.path)
const storage = multer.diskStorage({});
const upload = multer({ storage });

// POST: Create a new project (requires auth + image upload)
projectRouter.post('/create', authenticateUser, upload.single('projectImage'), createProject);

// GET: Fetch all projects of logged-in user
projectRouter.get('/get', authenticateUser, getProjects);

// DELETE: Delete a specific project (must match logged-in user ID)
projectRouter.delete('/delete/:id', authenticateUser, deleteProject);

//get project by userID
projectRouter.get('/get-project/:id', getById);


//get all project 
projectRouter.get('/getallproject' , getAllProject)

export default projectRouter;

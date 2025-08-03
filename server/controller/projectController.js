import Project from "../model/projectModel.js";
import { v2 as cloudinary } from 'cloudinary';

// POST /api/project/create
export const createProject = async (req, res) => {
  try {
    const userID = req.user._id;
    const { projectName, projectDescription, projectLink } = req.body;

    if (!projectName) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    let image = '';

    if (req.file) {
      const uploadPicture = await cloudinary.uploader.upload(req.file.path, {
        folder: 'project_pics_penpixel',
      });
      image = uploadPicture.secure_url;
    }

    const newProject = new Project({
      userID,
      projectName,
      projectDescription,
      projectImage: image,
      projectLink,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project uploaded successfully",
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/project/get
export const getProjects = async (req, res) => {
  try {
    const userID = req.user._id;
    const projects = await Project.find({ userID }).sort({ createdAt: -1 });
    res.status(200).json({
      success : true,
      projects
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/project/delete/:id
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.user._id;

    const project = await Project.findOne({ _id: id, userID });
    if (!project) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    await Project.deleteOne({ _id: id });
    res.status(200).json({success : true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get project by user id
export const getById = async (req, res) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return res.status(400).json({  
        success: false,
        message: "You need to enter a valid ID"
      });
    }

    const projects = await Project.find({ userID });

    if (!projects || projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found for this user"
      });
    }

    return res.status(200).json({
      success: true,
      projects
    });

  } catch (error) {
    console.error("Error in getById:", error.message);
    return res.status(500).json({  
      success: false,
      message: "Server error: " + error.message
    });
  }
};

//* get all projects 
export const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find();

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error fetching data from the server: ${error.message}`,
    });
  }
};

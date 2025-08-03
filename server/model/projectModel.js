import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  projectDescription: {
    type: String,
    required: false,
    trim: true
  },
  projectImage: {
    type: String,
    required: false
  },
  projectLink: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema)

export default Project

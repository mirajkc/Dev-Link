import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String, 
    required: true
  },
  description : {
    type : String,
    required : false
  },
  protfolio : {
    type : String,
    required : false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

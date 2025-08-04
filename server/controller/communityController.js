

//* post the community post 

import Community from "../model/CommunityModel.js"

export const createPost  = async(req,res)=> {
  try {

    //* authentocate and het the users id from the middleware
    const userId = req.user._id
    if(!userId){
      return res.status(200).json({
        success : false,
        message : "User not authenticated please re-login or refresh the page"
      })
    }

 
    //* check if comment is empty or not
    const {communityPost} = req.body
    if(!communityPost){
      return res.status(200).json({
        success  : false,
        message : "Comminity Post Can't Be Empty"
      })
    }

    if(communityPost.length <= 10 ){
      return res.status(200).json({
        success : false,
        message : "Community post length can't be less that 10 letters"
      })
    }

    const {postResult} = await Community.create({postedBy : userId , post : communityPost})
    if(!postResult){
      return res.status(200).json({
        success : false,
        message : "Could not create the community post"
      })
    }

    res.status(200).json({
      success : true,
      message : "Post Sucessfully Created"
    }) 
  } catch (error) {
    res.status(400).json({
      success : false,
      message  : error.message
    })
  }
}

import Community from '../model/CommunityModel.js';

export const getAllPost = async (req, res) => {
  try {
    const posts = await Community.find()
      .populate("postedBy", "name profilePic") // Optional: include user details
      .sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No posts found! Be the first one to create.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched all community posts.",
      posts,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

//* delete the post by the id 
export const deletePostById = async(req,res)=>{
  try {
    const {username} = req.admin
    if(!username){
      
    }
    
  } catch (error) {
    
  }
}
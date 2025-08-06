

//* post the community post 

import Community from "../model/CommunityModel.js"

export const createPost = async (req, res) => {
  try {
    //* authenticate and get the user's ID from middleware
    const userId = req.user._id;

    if (!userId) {
      return res.status(200).json({
        success: false,
        message: "User not authenticated. Please re-login or refresh the page.",
      });
    }

    //* extract data
    const { communityPost, title } = req.body;

    //* validation
    if (!communityPost || !title) {
      return res.status(200).json({
        success: false,
        message: "Community Post or Title can't be empty.",
      });
    }

    if (communityPost.length <= 10) {
      return res.status(200).json({
        success: false,
        message: "Community post must be more than 10 characters.",
      });
    }

    if (title.length <= 4) {
      return res.status(200).json({
        success: false,
        message: "Title must be more than 4 characters.",
      });
    }

    //* create post
    const postResult = await Community.create({
      postedBy: userId,
      title,
      post: communityPost,
    });

    if (!postResult) {
      return res.status(200).json({
        success: false,
        message: "Could not create the community post.",
      });
    }

    //* success
    res.status(200).json({
      success: true,
      message: "Post successfully created.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const getAllPost = async (req, res) => {
  try {
    const posts = await Community.find()
      .populate("postedBy", "name profilePic") 
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


//*delete the community post by the communiuty post id 


//* to shown delete button only to the post creator 

export const postOwner = async (req, res) => {
  try {
    const userId = req.user._id; 
    const communityId = req.params._id;

    if (!userId || !communityId) {
      return res.status(200).json({
        success: false,
        postOwnerShip: false,
        message: "User or Post ID is missing",
      });
    }

    const post = await Community.findOne({
      _id: communityId,
      postedBy: userId,
    });

    if (!post) {
      return res.status(200).json({
        success: true,
        postOwnerShip: false,
      });
    }

    return res.status(200).json({
      success: true,
      postOwnerShip: true,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      postOwnerShip: false,
      message: error.message,
    });
  }
};


//* this deletion can be done by user

export const deletePostById = async (req, res) => {
  try {
    const userId = req.user._id;
    const {id} = req.params

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Please re-login or refresh the page.",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. Community post ID missing.",
      });
    }

    
    const post = await Community.findOne({ _id:id, postedBy: userId });

    if (!post) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You are not allowed to delete this post.",
      });
    }

    const deletedPost = await Community.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(500).json({
        success: false,
        message: "Error deleting the post.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted the post.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

//* api endpoint to create the comment 
export const createCommentOnPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const { comment } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID or post ID. Please log in or refresh the page.",
      });
    }

    if (!comment || comment.length <= 10) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty and must be longer than 10 characters.",
      });
    }

    
    const post = await Community.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

   
    post.comments.push({ commentBy: userId, comment });
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added comment.",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};


//* fetch comments by the community id 
export const fetchCommentById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Community post ID is required.',
      });
    }

    const post = await Community.findById(id)
      .select('comments') 
      .populate('comments.commentBy', 'name profilePic'); 

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Community post not found.',
      });
    }

    return res.status(200).json({
      success: true,
      comments: post.comments,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to fetch comments from the server: ${error.message}`,
    });
  }
};


//* get the single community and post upon detail
export const getPostById = async (req, res) => {
  try {
    const  communityId  = req.params.id;

    if (!communityId) {
      return res.status(400).json({
        success: false,
        message: `Community ID is required.`,
      });
    }

    const post = await Community.findById(communityId)
      .populate("postedBy", "name profilePic"); 

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Community post not found in the database.",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error retrieving post: ${error.message}`,
    });
  }
};
import User from "../model/userModel.js";
import LikeDislike from "../model/LikeDislike.js";

//! like the user
export const getLikes = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const targetUser = req.params.id;

    //* check if user is liking his own profile or not
    if (currentUser.toString() === targetUser) {
      return res.status(200).json({
        success: false,
        message: "You can't like your own profile. "
      });
    }

    //* check if userData exist or not on LikeDislike Model
    let data = await LikeDislike.findOne({ userId: targetUser });

    //* if user is not found create new user
    if (!data) {
      data = new LikeDislike({ userId: targetUser, likedBy: [], dislikedBy: [] });
    }

    //* check if user already liked profile or not?
    if (data.likedBy.includes(currentUser)) {
      return res.status(400).json({
        success: false,
        message: "You already liked this user"
      });
    }

    //* Remove dislike if user has disliked the profile before
    data.dislikedBy = data.dislikedBy.filter(id => id.toString() !== currentUser.toString());

    //* add user to liked by 
    data.likedBy.push(currentUser);
    await data.save();

    res.status(200).json({
      success: true,
      message: "Successfully liked user. "
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

//! dislike the User 
export const getDisliked = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const targetUser = req.params.id;

    //* check if user wants to dislike his own id
    if (currentUser.toString() === targetUser) {
      return res.status(200).json({
        success: false,
        message: "You Cannot Dislike Your Own Id 😂😂😂"
      });
    }

    //* check if user exists or not in database 
    let data = await LikeDislike.findOne({ userId: targetUser });

    //* create new data for user if user does not exist
    if (!data) {
      data = new LikeDislike({ userId: targetUser, likedBy: [], dislikedBy: [] });
    }

    //* check if user has already disliked or not?
    if (data.dislikedBy.includes(currentUser)) {
      return res.status(400).json({
        success: false,
        message: "You already disliked this profile"
      });
    }

    //* remove like if user has liked this profile before
    data.likedBy = data.likedBy.filter(id => id.toString() !== currentUser.toString());

    data.dislikedBy.push(currentUser);
    await data.save();

    res.status(200).json({
      success: true,
      message: "Successfully disliked the user"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

//! get the user like count 
export const fetchLikesData = async (req, res) => {
  try {
    const targetUser = req.params.id;

    //* check if we are getting userID
    if (!targetUser) {
      return res.status(400).json({
        success: false,
        message: "Could Not Fetch user Id From Params"
      });
    }

    //* find user in the database 
    const data = await LikeDislike.findOne({ userId: targetUser });

    //* if user not found
    if (!data) {
      return res.status(200).json({
        success: true,
        likedBy: [],
        likeCount: 0
      });
    }

    //* if user found 
    res.status(200).json({
      success: true,
      likedBy: data.likedBy,
      likeCount: data.likedBy.length
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

//! get the dislike data 
export const fetchDislikesData = async (req, res) => {
  try {
    const targetUser = req.params.id;

    //* check if user exists 
    if (!targetUser) {
      return res.status(400).json({
        success: false,
        message: "Could Not Fetch user Id From Params"
      });
    }

    //* find user in the database 
    const data = await LikeDislike.findOne({ userId: targetUser });

    //* if user not found
    if (!data) {
      return res.status(200).json({
        success: true,
        dislikedBy: [],
        dislikeCount: 0
      });
    }

    //* if user found 
    res.status(200).json({
      success: true,
      dislikedBy: data.dislikedBy,
      dislikeCount: data.dislikedBy.length
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

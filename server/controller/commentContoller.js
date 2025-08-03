import Comment from "../model/CommentModel.js";

//* Create a new comment
export const createComment = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user?._id;
    const { content } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ success: false, message: "Target user ID is required" });
    }

    if (!currentUserId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ success: false, message: "Comment content cannot be empty" });
    }

    if (targetUserId.toString() === currentUserId.toString()) {
      return res.status(400).json({ success: false, message: "You cannot comment on your own profile" });
    }

    const newComment = await Comment.create({
      sender: currentUserId,
      receiver: targetUserId,
      content: content.trim(),
    });

    await newComment.populate("sender", "name profilePic");

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });

  } catch (error) {
    console.error("Error in createComment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

//* Get comments for a user by user ID
export const getCommentByID = async (req, res) => {
  try {
    const targetUserId = req.params.id;

    if (!targetUserId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const comments = await Comment.find({ receiver: targetUserId })
      .populate("sender", "name profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: comments.length > 0 ? "Comments retrieved successfully" : "No comments found",
      comment: comments,
    });

  } catch (error) {
    console.error("Error in getCommentByID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

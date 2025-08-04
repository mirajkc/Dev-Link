import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    post: {
      type: String,
      required: true,
    },

    commentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Community = mongoose.models.Community || mongoose.model('Community', communitySchema);

export default Community;

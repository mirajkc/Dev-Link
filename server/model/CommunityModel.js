import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title : {
      type : String,
      required :true
    },

    post: {
      type: String,
      required: true,
    },
    comments: [
      {
        commentBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Community = mongoose.models.Community || mongoose.model('Community', communitySchema);

export default Community;

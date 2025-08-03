import mongoose from 'mongoose'

const LikeDislikeSchema = new mongoose.Schema({

  //the profile who is getting the like or dilike 
  //if we were to add more than one value in the attribute we must use the array
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },

  //the userId of profile who is going to like the user
  likedBy : [ {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }],

  //the person who will dislike the user
  dislikedBy :[ {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
  }],
}, {timestamps : true })

const LikeDislike = mongoose.model.LikeDislike ||  mongoose.model('LikeDislike',LikeDislikeSchema )

export default LikeDislike 
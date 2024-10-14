const mongoose = require("mongoose");
const Post = require("./Post");

const CommentSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: Post,
      required: true,
    },
		user_id: {
			type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
		},
		content: {
			type: String,
			maxLength: 100,
			required: true,
    },
    children: {
      type: [{
        type: Schema.ObjectId,
        ref: "Comment"
      }]
    },
    counter: {
      type: Number,
      required:true,
    }
	},
	{ timestamps: true }
);

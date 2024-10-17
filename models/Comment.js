const mongoose = require("mongoose");
const Post = require("./Post");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: Post,
      required: true,
    },
		userId: {
			type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      trim:true,
		},
		content: {
			type: String,
			maxLength: 100,
			required: [true, "Please enter a comment"]
    },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema)
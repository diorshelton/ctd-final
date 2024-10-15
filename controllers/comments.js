const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { StatusCodes,  } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const showComments = async (req, res) => {
	res.send("show comments");
};
const addComment = async (req, res, next) => {
	try {
		const {
			body: { content },
			user: { userId },
			params: { id: postId },
		} = req;
    // Create comment
		const comment = await Comment.create({ postId, userId, content });
    // Get comment id
    const commentId = await comment._id;
    // Push comment to post array
    const post = await Post.findByIdAndUpdate(
      { _id: postId, createdBy: userId },
      {"$push":{
        "comments":comment
      }},
      { new: true, runValidators: true }
    );
    if (!commment) {
    }
    if (!post || !postId) {
      throw new NotFoundError(`No post found`);
    }
    // Return response with comment
		// const postWithComment = await Comment.findById({commentId});
		res.status(StatusCodes.OK).json({msg:"Comment added"})
    
	} catch (err) {
		console.log(err);
    res.send(err.message)
	}
  // next();
};
const removeComment = async (req, res) => {
	res.send("remove comment");
};
const editComment = async (req, res) => {
	res.send("edit comment");
};

module.exports = { showComments, addComment, removeComment, editComment };

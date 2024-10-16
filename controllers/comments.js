const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const showComments = async (req, res) => {
	try {
		const postId = req.params;
		// shows all comments on a single post
		const comment = await Comment.where({ postId: postId.id });
		res.status(StatusCodes.OK).json(comment);
	} catch (err) {
		console.log(err);
	}
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
			{
				$push: {
					comments: comment,
				},
			},
			{ new: true, runValidators: true }
		);
		if (!comment) {
			throw new Error(err.message);
		}
		if (!post || !postId) {
			throw new NotFoundError(`No post found`);
		}
		// Return response with comment
		// const postWithComment = await Comment.findById({commentId});
	} catch (err) {
		console.log(err);
		res.send(err.message);
	}
	res.status(StatusCodes.OK).json({ msg: "Comment added" });
};
const removeComment = async (req, res) => {
	const {
		user: { userId },
		params: { id: commentId },
	} = req;
	// get commentId
	// const commentId = "670ebc6405dfd1a58688f670";
	const comment = await Comment.findByIdAndDelete({
		_id: commentId,
		createdBy: userId,
	});
	if (!comment) {
		console.log(err);
		throw new NotFoundError(`No comment with id ${commentId}`);
	}
	res.status(StatusCodes.OK).json({ msg: "The entry was deleted" });
};
const editComment = async (req, res) => {
	const {
		body: { content },
		user: { userId },
		params: { id: commentId },
	} = req;

	const comment = await Comment.findByIdAndUpdate(
		{ _id: commentId, createdBy: userId },
		content,
		{ new: true, runValidators: true }
	);
};

module.exports = { showComments, addComment, removeComment, editComment };

const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const showComments = async (req, res) => {
	const postId = req.params;
	// shows all comments on a single post
	const comment = await Comment.where({ postId: postId.id });
	if (!comment || comment.length === 0) {
		return res.status(StatusCodes.OK).json({ message: "No comments yet" });
	}
	res.status(StatusCodes.OK).json(comment);
};
const addComment = async (req, res) => {
		const {
			body: { content },
			user: { userId },
			params: { id: postId },
		} = req;
		// Create comment
		const comment = await Comment.create({ postId, userId, content });
		// Get comment id
		const commentId = comment._id;
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
		if (!post || !postId) {
			throw new NotFoundError(`No post found`);
		}
	res.status(StatusCodes.OK).json({ msg: "Comment added" });
};
const removeComment = async (req, res) => {
	const {
		user: { userId },
		headers: { c_id: commentId },
	} = req;
	// get commentId
	const comment = await Comment.findByIdAndDelete({
		_id: commentId,
		createdBy: userId,
	});
	if (!comment) {
		throw new NotFoundError(`No comment with id ${commentId}`);
	}
	res.status(StatusCodes.OK).json({ msg: "The entry was deleted" });
};
const editComment = async (req, res) => {
	const {
		user: { userId },
		headers: { c_id: commentId },
	} = req;

	const comment = await Comment.findByIdAndUpdate(
		{ _id: commentId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!comment) {
		throw new NotFoundError(`No comment with id ${commentId}`);
	}
	res.status(StatusCodes.OK).json({ comment });
};

module.exports = { showComments, addComment, removeComment, editComment };

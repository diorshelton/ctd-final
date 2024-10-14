const Post = require("../models/Post")
const { BadRequestError } = require("../errors")
const { StatusCodes } = require("http-status-codes");

const showComments = async (req, res) => {
  res.send("show comments")
}
const addComment = async (req, res) => {
  res.send("add comment")
}
const removeComment = async (req, res) => {
  res.send("remove comment");
}
const editComment = async (req, res) => {
  res.send("edit comment");
}

module.exports = { showComments, addComment, removeComment, editComment };
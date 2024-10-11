const Post = require("../models/Post")
const { StatusCodes } = require("http-status-codes")

const getAllPosts = async (req, res) => {
  res.send("Get all posts"); 
}

const getPost = async (req, res) => {

  res.send("Get post hit")
      // console.log(req.params, req.user);
}

const createPost = async (req, res)=> {
  res.send('Create a post') 
}

const updatePost = async (req, res) => {
  console.log(req.params)
  res.send('Update a post') 
}

const deletePost = async (req, res)=> {
  res.send('Delete a post') 
}

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost}
const express = require('express');
const router = express.Router()
  
const {getAllPosts, getPost, createPost, updatePost, deletePost} = require('../controllers/posts')

router.route("/").get(getAllPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router
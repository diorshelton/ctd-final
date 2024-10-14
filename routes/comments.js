const express = require("express");
const router = express.Router();

const { showComments, addComment, editComment, removeComment } = require("../controllers/comments")

router.route("/:id").get(showComments).post(addComment).patch(editComment).delete(removeComment);

module.exports = router
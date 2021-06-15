const express = require("express");
const {
    getAllPosts,
    createNewPost,
    getOnePost,
    updatePost,
    deletePost
} = require("../controllers/postController");
const protect = require("../middleware/middleware");
const router = express.Router();

router.route('/')
    .get(protect, getAllPosts)
    .post(protect, createNewPost);

router.route('/:id')
    .get(protect, getOnePost)
    .patch(protect, updatePost)
    .delete(protect, deletePost)

module.exports = router;
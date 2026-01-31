import express, {Router} from "express";
import { isAuthenticated } from "../middlewares/user.middleware";
const { createPost, fetchPosts, fetchUserPosts, fetchAuthorPosts, searchPosts } = require('../controllers/post.controller');

const router: Router = express.Router();

router.post("/post", isAuthenticated, createPost);
router.get("/posts", isAuthenticated, fetchPosts);
router.get("/posts/user", isAuthenticated, fetchUserPosts);
router.get("/posts/author", isAuthenticated, fetchAuthorPosts);
router.get("/posts/search", isAuthenticated, searchPosts);

module.exports = router;
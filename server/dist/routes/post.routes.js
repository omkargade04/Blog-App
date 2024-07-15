"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = require("../middlewares/user.middleware");
const { createPost, fetchPosts, fetchUserPosts, fetchAuthorPosts } = require('../controllers/post.controller');
const router = express_1.default.Router();
router.post("/post", user_middleware_1.isAuthenticated, createPost);
router.get("/posts", user_middleware_1.isAuthenticated, fetchPosts);
router.get("/posts/user", user_middleware_1.isAuthenticated, fetchUserPosts);
router.get("/posts/author", user_middleware_1.isAuthenticated, fetchAuthorPosts);
module.exports = router;

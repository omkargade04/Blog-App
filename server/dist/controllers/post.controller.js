"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const authorId = req.user.userId;
    if (!title || !content) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }
    try {
        const newPost = yield prisma.post.create({
            data: {
                title: title,
                content: content,
                author: {
                    connect: {
                        userId: authorId,
                    },
                },
                createdAt: new Date(),
            }
        });
        return res.status(201).json({ status: true, message: "Post created successfully", post: newPost });
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: true, message: "Internal server error" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
const fetchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return res.status(200).json({
            status: true,
            data: blogs,
            message: "Blogs fetched successfully",
        });
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
const fetchUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const posts = yield prisma.post.findMany({
            where: {
                authorId: userId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return res.status(200).json({
            status: true,
            posts: posts,
            message: "Blogs fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
    finally {
        yield prisma.$disconnect();
    }
});
const fetchAuthorPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = parseInt(req.query.author, 10);
    if (!authorId) {
        return res.status(400).json({ status: false, message: "Author ID is required" });
    }
    try {
        const posts = yield prisma.post.findMany({
            where: {
                authorId: authorId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        res.status(200).json({ status: true, posts: posts });
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
module.exports = { createPost, fetchPosts, fetchUserPosts, fetchAuthorPosts };

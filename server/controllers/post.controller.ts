import { PrismaClient } from "@prisma/client";
import { ReqMid } from "../types/user";

const prisma = new PrismaClient();

const createPost = async(req: ReqMid, res: any) => {
    const { title, content } = req.body;

    const authorId = req.user.userId;

    if (!title || !content) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try{
        const newPost = await prisma.post.create({
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

    }catch(err: any) {
        console.log("Error: ", err);
        res.status(500).json({status: true, message: "Internal server error"});
    }finally {
    await prisma.$disconnect();
  }
}

const fetchPosts = async(req: ReqMid, res: any) => {
    try{
      const blogs = await prisma.post.findMany({
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
    }catch(err: any) {
        console.log("Error: ", err);
        res.status(500).json({status: false, message: "Internal server error"});
    }finally {
        await prisma.$disconnect();
    }
}

const fetchUserPosts = async(req: ReqMid, res: any) => {
  try {
    const userId = req.user.userId;

    const posts = await prisma.post.findMany({
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
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }finally {
    await prisma.$disconnect();
  }
}

const fetchAuthorPosts = async (req: ReqMid, res: any) => {
    const authorId = parseInt(req.query.author as string, 10);
    if (!authorId) {
      return res.status(400).json({ status: false, message: "Author ID is required" });
    }
  
    try {
      const posts = await prisma.post.findMany({
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
    } catch (err: any) {
      console.log("Error: ", err);
      res.status(500).json({ status: false, message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  };

const searchPosts = async (req: ReqMid, res: any) => {
  const query = req.query.q as string;

  if (!query || query.trim() === "") {
    return res.status(400).json({ status: false, message: "Search query is required" });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      status: true,
      posts: posts,
      count: posts.length,
      message: posts.length > 0 ? "Blogs found successfully" : "No blogs found matching your search",
    });
  } catch (err: any) {
    console.log("Error: ", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { createPost, fetchPosts, fetchUserPosts, fetchAuthorPosts, searchPosts };
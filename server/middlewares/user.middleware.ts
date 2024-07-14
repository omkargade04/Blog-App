import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isAuthenticated = async (
    req: any,
    res: any,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.header("Authorization");
      const token: any = authHeader ? authHeader.replace("Bearer ", "") : null;
  
      if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized user!" });
      }
  
      const userToken = await prisma.userToken.findFirst({
        where: { token: token },
      });
  
      if (!userToken) {
        return res.status(401).json({ status: false, message: "Unauthorized user!" });
      }
      const user = await prisma.user.findUnique({
        where: { userId: userToken.userId },
      });
  
      if (!user) {
        return res.status(401).json({ status: false, message: "Unauthorized user!" });
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  };


export const generateUserToken = async (user_id: number) => {
    try {
      console.log(user_id);
      const key = process.env.TOKEN_SECRET || "default_secret_token";
      const token = jwt.sign({ id: user_id }, key, { expiresIn: "24h" });
  
      const newToken = await prisma.userToken.create({
        data: {
          token: token,
          user: {
            connect: {
              userId: user_id,
            },
          },
        },
      });
  
      return token;
    } catch (err: any) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  };


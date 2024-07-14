import express, { Request, Response, Application, urlencoded } from "express";
import { PrismaClient } from "@prisma/client";
import { generateUserToken } from "../middlewares/user.middleware";
import { ReqMid } from "../types/user";
import bcrypt from "bcrypt";
require("dotenv").config();

const prisma = new PrismaClient();

if(prisma) {
    console.log("DB Connected");
}

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(401).json({ status: false, message: "Fill all the fields" });
    }
  
    try {
      const hashPassword = await bcrypt.hash(password, 10);
  
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
        },
        select: {
          name: true,
          email: true,
        },
      });

      const user: any = await prisma.user.findUnique({
        where: { email: email },
      });


      const token = await generateUserToken(user.userId);
  
      res.status(200).json({ status: true, message: "User created successfully.", token: token, user: newUser });
    } catch (err: any) {
      // Handle errors that occurred during the database operation
      if (err.code === 'P2002' && err.meta.target.includes('email')) {
        // If a user with the same email already exists, send a 409 Conflict response
        res.status(409).json({ error: "User with this email already exists." });
      } else {
        // For other errors, log the error and send a 500 Internal Server Error response
        console.log(err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    } finally {
      await prisma.$disconnect();
    }
  };

export const signin = async (req: ReqMid, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
  
      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = await generateUserToken(user.userId);
          const { password, ...userWithoutPassword } = user;
          return res.json({
            status: true,
            token: token,
            user: userWithoutPassword,
            message: "User signed in successfully",
          });
        } else {
          return res.status(400).json({ status: false, message: "Invalid password" });
        }
      } else {
        return res.status(400).json({ status: false, message: "User Not Found" });
      }
    } catch (err: any) {
      return res.status(500).json({ status: false, message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  };

module.exports = { signup, signin };

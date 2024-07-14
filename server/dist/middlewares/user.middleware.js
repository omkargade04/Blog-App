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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader ? authHeader.replace("Bearer ", "") : null;
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        const userToken = yield prisma.userToken.findFirst({
            where: { token: token },
        });
        if (!userToken) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        const user = yield prisma.user.findUnique({
            where: { userId: userToken.userId },
        });
        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.isAuthenticated = isAuthenticated;
const generateUserToken = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user_id);
        const key = process.env.TOKEN_SECRET || "default_secret_token";
        const token = jsonwebtoken_1.default.sign({ id: user_id }, key, { expiresIn: "24h" });
        const newToken = yield prisma.userToken.create({
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
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.generateUserToken = generateUserToken;

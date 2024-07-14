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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const user_middleware_1 = require("../middlewares/user.middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const prisma = new client_1.PrismaClient();
if (prisma) {
    console.log("DB Connected");
}
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(401).json({ status: false, message: "Fill all the fields" });
    }
    try {
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.user.create({
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
        const user = yield prisma.user.findUnique({
            where: { email: email },
        });
        const token = yield (0, user_middleware_1.generateUserToken)(user.userId);
        res.status(200).json({ status: true, message: "User created successfully.", token: token, user: newUser });
    }
    catch (err) {
        // Handle errors that occurred during the database operation
        if (err.code === 'P2002' && err.meta.target.includes('email')) {
            // If a user with the same email already exists, send a 409 Conflict response
            res.status(409).json({ error: "User with this email already exists." });
        }
        else {
            // For other errors, log the error and send a 500 Internal Server Error response
            console.log(err);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }
    try {
        const user = yield prisma.user.findUnique({
            where: { email: email },
        });
        if (user) {
            const auth = yield bcrypt_1.default.compare(password, user.password);
            if (auth) {
                const token = yield (0, user_middleware_1.generateUserToken)(user.userId);
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return res.json({
                    status: true,
                    token: token,
                    user: userWithoutPassword,
                    message: "User signed in successfully",
                });
            }
            else {
                return res.status(400).json({ status: false, message: "Invalid password" });
            }
        }
        else {
            return res.status(400).json({ status: false, message: "User Not Found" });
        }
    }
    catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.signin = signin;
module.exports = { signup: exports.signup, signin: exports.signin };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const express = require('express');
const cors = require('cors');
const cron = require("node-cron");
const userRoutes = require('../routes/user.routes');
const postRoutes = require('../routes/post.routes');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://blog-app-blush-one.vercel.app"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
const port = process.env.PORT || 5000;
app.use("/", userRoutes);
app.use("/", postRoutes);
app.get("/", (req, res) => {
    res.send("Server running");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
cron.schedule("*/5 * * * *", () => {
    console.log("Sending scheduled request at", new Date().toLocaleDateString(), "at", `${new Date().getHours()}:${new Date().getMinutes()}`);
    (0, request_1.default)(`${process.env.SELF_URL}`, function (error, response) {
        if (!error && response.statusCode == 200) {
            console.log("im okay");
        }
    });
});

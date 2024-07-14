"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.routes');
const postRoutes = require('../routes/post.routes');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
    origin: [
        "http://localhost:3000",
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

require("dotenv").config("./.env");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const express = require('express');
const server = express();

const port = process.env.SERVER_PORT || 3000;

const userRouter = require("./api/user/user.router"); 
const topicRouter = require('./api/topic/topic.router');
const postRouter = require('./api/post/post.router')
const labelRouter = require('./api/label/label.router')


server.use(express.json());
server.use("/api/user", userRouter);
server.use("/api/topic", topicRouter);
server.use("/api/post", postRouter);
server.use("/api/label", labelRouter);

server.use(cookieParser);
const ttl = 1000 * 60 * 60 * 8;

server.use(sessions({
    secret: process.env.JSON_TOKEN,
    saveUninitialized:true,
    cookie: { maxAge: ttl },
    resave: false
}));

server.listen(port, () => {
    console.log("Server is listening to port: " + port);
});
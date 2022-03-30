require("dotenv").config();

const sessionService = require('../session.service');
const permissionService = require('../permisson.service');
const postService = require("./post.service");
const res = require("express/lib/response");

/*
    Post functions
*/

const getPostsByTopic = async (req, res) => {
    // Holt sich alle Posts
    const token = req.body.token;
    const topicId = parseInt(req.body.tid);

    console.log(token)
    console.log(topicId)

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        postService.getPostsByTopic(topicId, (error, results) => {
            if (error || !results) {
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    }
}

const createPost = async (req, res) => {
    // Erstellt einen post
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        postService.createPost(validSession, req.body, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: 1,
                pid: result.insertId
            })
        });
    }
}

const getSubscriptions = async(req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        postService.getSubscriptionPosts(validSession, (error, results) => {
            if (error || !results) {
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
}

const deletePost = async (req, res) => {
    const body = req.body;

    const validSession = await sessionService.verify(body.token);
    if (validSession > 0) {
        postService.deletePost(body.pid, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: 1
            });
        });
    }
}

/*
    CommentFunctions
*/

const createComment = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        postService.createComment(validSession, req.body, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: 1,
                cid: result.insertId
            });
        });
    }
}

const deleteComment = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        postService.deleteComment(req.body.cid, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: 1
            })
        })
    }
}

/*
    Label functions
*/
const addLabel = async(req, res) => {
    const body = req.body;
    
    const validSession = await sessionService.verify(body.token);
    const hasPermisson = permissionService.hasPostPermission(body.pid, validSession);
    if (hasPermisson) {
        postService.addLabel(body, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: 0
                });
            }
            return res.status(200).json({
                success: 1
            });
        });
    }
}

const removeLabel = async(req, res) => {
    const body = req.body;
    
    const validSession = await sessionService.verify(body.token);
    const hasPermisson = permissionService.hasPostPermission(body.pid, validSession);
    if (hasPermisson) {
        postService.removeLabel(body, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: 0
                });
            }
            return res.status(200).json({
                success: 1
            });
        });
    }
}

module.exports = { getPostsByTopic, createPost, deletePost, getSubscriptions, createComment, deleteComment, addLabel, removeLabel }
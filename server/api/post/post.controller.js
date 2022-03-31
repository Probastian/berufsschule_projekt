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
    const topicId = parseInt(req.params.id);

    postService.getPostsByTopic(topicId, (error, results) => {
        if (error || !results) {
            return res.status(200).json({
                success: false,
                message: "Database connection error occured."
            });
        }
        return res.status(200).json({
            success: true,
            data: results
        })
    }); 
}

const getPostById = async (req, res) => {
    const postId = parseInt(req.params.id);
    console.log(postId)

    postService.getPostById(postId, (error, result) => {
        if (error || !result) {
            return res.status(200).json({
                success: false,
                message: "Database connection error occured."
            });
        } else if (result.length < 1) {
            return res.status(200).json({
                success: false,
                message: `No post found for id ${pid}`
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        })
    })
}

const createPost = async (req, res) => {
    // Erstellt einen post
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        postService.createPost(validSession, req.body, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: false,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: true,
                pid: result.insertId
            })
        });
    }
}

const getSubscriptions = async(req, res) => {
    const token = req.body.token;

    console.log(token)

    const validSession = await sessionService.verify(token);
    console.log(validSession)

    if (validSession) {
        postService.getSubscriptionPosts(validSession, (error, results) => {
            if (error || !results) {
                return res.status(200).json({
                    success: false,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: true,
                data: results
            });
        });
    } else {
        return res.status(200).json({
            success: false,
            message: "Invalid Session."
        });
    }
}

const getDefaultHome = (req, res) => {
    postService.getDefaultHomePosts((error, results) => {
        if (error || !results) {
            return res.status(200).json({
                success: false,
                message: "Database connection error occured."
            });
        }

        return res.status(200).json({
            success: true,
            data: results
        });
    });
}

const deletePost = async (req, res) => {
    const body = req.body;

    const validSession = await sessionService.verify(body.token);
    if (validSession > 0) {
        postService.deletePost(body.pid, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: false,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: true
            });
        });
    }
}

/*
    CommentFunctions
*/

const getComments = (req, res) => {
    const pid = parseInt(req.params.id);

    if (pid) {
        postService.getCommentsByPost(pid, (error, results) => {
            if (error || !results) {
                return res.status(200).json({
                    success: false,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: true,
                data: results
            });
        }) 
    }
}

const createComment = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        postService.createComment(validSession, req.body, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: false,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: true,
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
                    success: false,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: true
            })
        })
    }
}

/*
    Label functions
*/

const getAllLabels = (req, res) => {
    postService.getAllLabels((error, results) => {
        if (error || !results) {
            return res.status(200).json({
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            data: results
        });
    });
}

const getLabelsForPost = (req, res) => {
    postService.getLabelsForPost(parseInt(req.params.id), (error, results) => {
        if (error || !results) {
            return res.status(200).json({
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            data: results
        });
    });
}

const addLabel = async(req, res) => {
    const body = req.body;
    
    const validSession = await sessionService.verify(body.token);
    const hasPermisson = permissionService.hasPostPermission(body.pid, validSession);
    if (hasPermisson) {
        postService.addLabel(body, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: false
                });
            }
            return res.status(200).json({
                success: true
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
                    success: false
                });
            }
            return res.status(200).json({
                success: true
            });
        });
    }
}

module.exports = { getPostsByTopic, getPostById, createPost, deletePost, getSubscriptions, getDefaultHome, getComments, createComment, deleteComment, getAllLabels, getLabelsForPost, addLabel, removeLabel }
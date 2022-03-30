require("dotenv").config();

const sessionService = require('../session.service');
const permissionService = require('../permisson.service');
const topicService = require("./topic.service");

const getAllTopics = async (req, res) => {
    topicService.getAll((err, results) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Database error occured."
            });
        }
        return res.status(200).json({
            success: true,
            data:results
        });
    }); 
} 

const getSubscriptions = async (req, res) => {
    const token = req.body.token;
    console.log("get subs")

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        topicService.getSubscriptions({uid: validSession}, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: "Database error occured."
                });
            } else if (!results) {
                return res.status(200).json({
                    success: false,
                    message: `No subscriptions found.`
                });
            }

            return res.status(200).json({
                success: true,
                data:results
            });
        });
    } else {
        return res.json({
            success: false,
            message: 'Invalid session.' 
        });
    }
}

const getTopicById = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id)

    topicService.getById(id, (err, result) => {
    if (err) {
            return res.status(200).json({
                success: false,
                message: "Database error occured."
            });
        } else if (!result) {
            return res.json({
                success: false,
                message: `No topic found.`
            });
        }        return res.status(200).json({
            success: true,
            data:result
        });
    }); 
}

const createTopic = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
    
    } else {
        return res.json({
            success: false,
            message: 'Invalid session.' 
        });
    }
}

const updateTopic = async (req, res) => {
    const body = req.body;

    console.log(body)
    const validSession = await sessionService.verify(body.token);
    const hasPermission = await permissionService.hasTopicPermission(validSession, body.tid);
    if (hasPermission) {
        topicService.update(body, (error, result) => {
            if (error) {
                return res.status(200).json({
                    success: false,
                    message: "Database connection error occured."
                });
            }
            return res.status(200).json({
                success: true,
                message: "Topic was updated."
            })
        });
    } else {
        return res.json({
            success: false,
            message: 'Invalid session or permission denied' 
        });
    }
}

const subscribe = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) { 
        topicService.subscribe({
            uid: validSession, 
            tid: req.body.tid
        }, (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(200).json({
                        success: false,
                        message: err.sqlMessage
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: true
            });
        });
    } else {
        return res.json({
            success: false,
            message: 'Invalid session.' 
        });
    }
}

const unsubscribe = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        topicService.unsubscribe({
            uid: validSession, 
            tid: req.body.tid
        }, (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(200).json({
                        success: false,
                        message: err.sqlMessage
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: true
            });
        });
    } else {
        return res.json({
            success: false,
            message: 'Invalid session.' 
        });
    }
}

module.exports = { getAllTopics, getTopicById, getSubscriptions, createTopic, updateTopic,  subscribe, unsubscribe }
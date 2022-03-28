require("dotenv").config();

const sessionService = require('../session.service');
const topicService = require("./topic.service");

const getAllTopics = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        topicService.getAll((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: "Database error occured."
                });
            }
            return res.status(200).json({
                success: 1,
                data:results
            });
        }); 
    }
} 

const getSubscriptions = async (req, res) => {
    const token = req.body.token;
    console.log("get subs")

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        topicService.getSubscriptions({uid: validSession}, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: "Database error occured."
                });
            } else if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: `No subscriptions found.`
                });
            }

            return res.status(200).json({
                success: 1,
                data:results
            });
        });
    } else {
        return res.json({
            success: 0,
            message: 'Invalid session.' 
        });
    }
}

const getTopicById = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        const id = parseInt(req.params.id);
        console.log(id)

        topicService.getById(id, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: "Database error occured."
                });
            } else if (!result) {
                return res.json({
                    success: 0,
                    message: `No topic found.`
                });
            }

            return res.status(200).json({
                success: 1,
                data:result
            });
        }); 
    } else {
        return res.json({
            success: 0,
            message: 'Invalid session.' 
        });
    }
}

const createTopic = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
    
    } else {
        return res.json({
            success: 0,
            message: 'Invalid session.' 
        });
    }
}

const updateTopic = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
    
    } else {
        return res.json({
            success: 0,
            message: 'Invalid session.' 
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
                        success: 0,
                        message: err.sqlMessage
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: 1
            });
        });
    } else {
        return res.json({
            success: 0,
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
                        success: 0,
                        message: err.sqlMessage
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error occured."
                });
            }

            return res.status(200).json({
                success: 1
            });
        });
    } else {
        return res.json({
            success: 0,
            message: 'Invalid session.' 
        });
    }
}

module.exports = { getAllTopics, getTopicById, getSubscriptions, createTopic, updateTopic,  subscribe, unsubscribe }
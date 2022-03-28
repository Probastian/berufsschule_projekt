require("dotenv").config();

const { append } = require("express/lib/response");
const { sign } = require("jsonwebtoken");

const sessionService = require('../session.service');
const permissionService = require('../permisson.service');
const userService = require("./user.service");

const logout = async (req, res) => {
    const sessionKey = req.token;
    await sessionService.destroyToken(token);
}

const createUser = (req, res) => {
    const body = req.body;

    userService.create(body, (err, results) => {
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
            success: 1,
            data: results
        });
    });
}

const getUserByUsername = async (req, res) => {
    const token = req.body.token;

    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        const username = req.params.name;
        if (username === "") {
            return res.json({
                success: 0,
                message: "Invalid username"
            })
        }

        userService.getUserByUsername(username, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "mysql error occured"
                });;
            } else if (!result) {
                return res.json({
                    success: 0,
                    message: `No user with the name ${username} was found.`
                });
            }
            
            return res.json({
                success: 1,
                user: result
            });
        });
    } else {
        return res.json({
            success: 0,
            message: 'Invalid session.' 
        });
    }
}

const updateUser = async (req, res) => {
    const token = req.body.token;
    const validSession = await sessionService.verify(token);
    if (validSession > 0) {
        const data = req.body.data
        if (await permissionService.hasUserPermission(validSession, data.uid)) {
            userService.updateUser(data, (error) => {
                if (error) {
                    return res.json({
                        success: 0,
                        message: "Error occured when updating user."
                    });
                } 

                return res.json({
                    success: 1,
                    data: "Data updated successfully!"
                });   
           });
        } else {
            return res.json({
                success: 0,
                message: "Permisson denied."
            });
        }
    } else {
        return res.json({
            success: 0,
            message: 'Invalid session.' 
        });
    }
}

const deleteUser = async (req, res) => {
    const token = req.body.token;
    const uid = req.body.uid;

    const sessionUID = await sessionService.verify(token);
    const isAllowed = sessionUID > 0 ? await permissionService.hasUserPermission(sessionUID, uid) : false;

    if (isAllowed) {
        userService.deleteUser(uid, (err) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Error occured when trying to delete the user."
                });
            }

            return res.json({
                success: 1,
                data: "Data deleted successfully!"
            });
        });
    } else {
        return res.json({
            success: 0,
            message: "Permisson denied."
        });
    }
}

const login = (req, res) => {
    const body = req.body;
    userService.getUserForLogin(body.login, (err, results) => {
        if (err) {
        } else if (!results) {
            return res.json({
              success: 0,
              message: "Invalid login credentials"
            });
        }

        if (results.password === body.password) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, process.env.JSON_TOKEN, {
                expiresIn: "8h"
            });

            sessionService.create({uid: results.id,sessionKey: jsontoken}).then(token => {
                return res.json({
                    token: token,
                    user: results
                });
            }).catch(error => {
                // Wenn eine Session existiert wird diese geschlossen und es wird eine neue erstellt bsp. Login in einem anderen Browser
                if (error.errno === 1062) {
                    sessionService.destroyById(results.id).then(success => {
                        if (success) {
                            sessionService.create({uid: results.id,sessionKey:jsontoken}).then(token => {
                                return res.json({
                                    token: token,
                                    user: results
                                });
                            });
                        }
                    });
                } else {
                    return res.json({
                        success: 0,
                        message: error
                    }); 
                }
            });
        } else {
            return res.json({
                success: 0,
                message: "Invalid login credentials."
            });
        }
    });
}

module.exports = { login, logout, createUser, getUserByUsername, updateUser, deleteUser }
require("dotenv").config();

const { append } = require("express/lib/response");
const { sign } = require("jsonwebtoken");

const sessionService = require('../session.service');
const permissionService = require('../permisson.service');
const userService = require("./user.service");

const logout = async (req, res) => {
    const sessionKey = req.body.token;
    sessionService.destroyToken(sessionKey)
        .then(respose => {
            return res.status(200).json({
                success: true
            })
        }).catch(error => {
            return res.status(200).json({
                success: false,
                message: error
            })
        });
}

const createUser = (req, res) => {
    const body = req.body;

    userService.create(body, (err, results) => {
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
            success: true,
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
                success: false,
                message: "Invalid username"
            })
        }

        userService.getUserByUsername(username, (err, result) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "mysql error occured"
                });;
            } else if (!result) {
                return res.json({
                    success: false,
                    message: `No user with the name ${username} was found.`
                });
            }
            
            return res.json({
                success: true,
                user: result
            });
        });
    } else {
        return res.json({
            success: false,
            message: 'Invalid session.' 
        });
    }
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    if (id < 1) {
        return res.json({
            success: false,
            message: "Invalid user id."
        });
    }

    userService.getUserById(id, (error, result) => {
        if (error || result === undefined) {
            return res.json({
                success: false,
                message: "Error occured while fetching the userdata."
            });
        } 

        return res.json({
            success: true,
            data: result
        });   
    })
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
                        success: false,
                        message: "Error occured when updating user."
                    });
                } 

                return res.json({
                    success: true,
                    data: "Data updated successfully!"
                });   
           });
        } else {
            return res.json({
                success: false,
                message: "Permisson denied."
            });
        }
    } else {
        return res.json({
            success: false,
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
                    success: false,
                    message: "Error occured when trying to delete the user."
                });
            }

            return res.json({
                success: true,
                data: "Data deleted successfully!"
            });
        });
    } else {
        return res.json({
            success: false,
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
              success: false,
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
                                    success: true,
                                    token: token,
                                    user: results
                                });
                            });
                        }
                    });
                } else {
                    return res.json({
                        success: false,
                        message: error
                    }); 
                }
            });
        } else {
            return res.json({
                success: false,
                message: "Invalid login credentials."
            });
        }
    });
}

module.exports = { login, logout, createUser, getUserByUsername, getUserById, updateUser, deleteUser }
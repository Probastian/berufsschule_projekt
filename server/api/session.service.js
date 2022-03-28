const mysql = require("../config/database");

const create = (data) => {
    return new Promise((resolve, reject) => {
        const userId = data.uid;
        const sessionKey = data.sessionKey;
        const ttl = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 8;

        if (userId && sessionKey) {
            mysql.query(
                `INSERT INTO session(user_id, session_key, ttl) values (?, ?, ?)`,
                [userId, sessionKey, ttl],
                (error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(sessionKey);
                }
            )
        } else {
            reject("Not enough data provided")
        }
    });
}

const verify = (token) => {
    return new Promise((resolve) => {
        if (token === undefined || token === "") {
            console.log("no token")
            resolve(0);
        }

        mysql.query(
            `SELECT ttl, user_id from session where session_key=?`,
            [token],
            (error, results) => {
                if (error) {
                    resolve(0);
                }
    
                if (results.length > 0 &&
                    results[0].ttl > Math.floor(new Date().getTime() / 1000)) 
                {
                    console.log(results[0].user_id)
                    resolve(results[0].user_id);
                } else {
                    resolve(0);
                }
            }
        );
    });
}

const destroyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (token) {
            mysql.query(
                `DELETE FROM session where session_key=?`,
                [token],
                (error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                }
            )
        } else {
            reject("Not enough data provided")
        }
    });
}

const destroyById = (id) => {
    return new Promise((resolve, reject) => {
        if (id) {
            mysql.query(
                `DELETE FROM session where user_id=?`,
                [id],
                (error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                }
            )
        } else {
            reject("Not enough data provided")
        }
    });
}

module.exports = { create, verify, destroyToken, destroyById };
const mysql = require("../config/database");

const hasUserPermission = (currentUid, uid) => {
    return new Promise((resolve) => {
        mysql.query(
            `SELECT role from user where id=?`,
            [currentUid],
            (error, result) => {
                if (error) {
                    resolve(false);
                }

                if (result.length < 0) {
                    resolve(false);
                } else if (result[0].role !== undefined && result[0].role > 0) {
                    console.log("user is admin")
                    resolve(true);
                } else if (uid === currentUid) {
                    console.log("user is current user")
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        )
    });
}

const hasTopicPermission = (uid, tid) => {
    return new Promise((resolve) => {
        mysql.query(
            `SELECT creator from topic where id=?`,
            [tid],
            (result, error) => {
                if (error) {
                    resolve(false);
                }

                if (result[0].creator === uid) {
                    resolve(true);
                }
                resolve(false);
            }
        )
    })
}

module.exports = { hasUserPermission }
const mysql = require("../config/database");

const isAdmin = async(uid) => {
    return new Promise((resolve) => {
        mysql.query(
            `SELECT role from user where id=?`,
            [uid],
            (error, result) => {
                if (error || !result) {
                    resolve(false);
                }

                if (result[0].role !== undefined && result[0].role > 0) {
                    resolve(true);
                }
                resolve(false);
            }
        )
    });
}

const hasUserPermission = async (currentUid, uid) => {
    const admin = await isAdmin(uid);
    if (admin) {
        return true;
    }

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
                    resolve(true);
                } else if (uid === currentUid) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        )
    });
}

const hasTopicPermission = async (uid, tid) => {
    const admin = await isAdmin(uid);
    if (admin) {
        return true;
    }

    return new Promise((resolve) => {
        mysql.query(
            `SELECT creator FROM topic WHERE id=?`,
            [tid],
            (result, error) => {
                if (error) {
                    resolve(false);
                }

                console.log(result)
                if (result !== null && result[0].creator === uid) {
                    resolve(true);
                }
                resolve(false);
            }
        )
    });
}

const hasPostPermission = async (pid, uid) => {
    const admin = await isAdmin(uid);
    if (admin) {
        return true;
    }

    return new Promise((resolve) => {
        mysql.query(
            `SELECT * from post where id=?`,
            [pid],
            (result, error) => {
                if (error) {
                    resolve(false);
                }

                if (result !== null && result[0].user_id === uid) {
                    resolve(true);
                }
                resolve(false);            }
        )
    });
}

module.exports = { isAdmin, hasUserPermission, hasTopicPermission, hasPostPermission }
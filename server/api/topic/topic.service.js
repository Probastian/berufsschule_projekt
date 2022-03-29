/*
    - Anglegen
    - name ändern
    - bei id holen
    - alle holen

*/

const mysql = require("../../config/database");

const create = (data, callBack) => {
    mysql.query(
        `INSERT INTO topic (name, description, creator, color) 
                    values (?, ?, ?, ?)`,
        [data.name, data.description, data.userId, data.color],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const update = (data, callBack) => {
    mysql.query(
        `UPDATE topic set name=?, description=?, color=? WHERE id=?`,
        [data.name, data.description, data.color, data.tid],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0])
        }
    )
}

const getAll = (callBack) => {
    mysql.query(
        `SELECT * FROM topic`,
        [],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
}

const getById = (uid, callBack) => {
    mysql.query(
        `SELECT * FROM topic where id=?`,
        [uid],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        }
    )
}

const getSubscriptions = (data, callBack) => {
    mysql.query (
        `SELECT * from topic t left join topic_member m on t.id=m.tid where m.uid=?`,
        [data.uid],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
}

const subscribe = (data, callBack) => {
    mysql.query(
        `INSERT INTO topic_member() values (?, ?)`,
        [data.uid, data.tid],
        (error) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null);
        }
    )
}

const unsubscribe = (data, callBack) => {
    mysql.query(
        `DELETE FROM topic_member WHERE uid=? AND tid=?`,
        [data.uid, data.tid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null);
        }
    )
}

module.exports = { create, update,  getAll, getSubscriptions, getById, subscribe, unsubscribe }
/*
    - Anglegen
    - name ändern
    - bei id holen
    - alle holen

*/

const mysql = require("../../config/database");

const create = (data, uid, callBack) => {
    mysql.query(
        `INSERT INTO topic (name, description, creator) 
                    values (?, ?, ?)`,
        [data.name, data.description, uid],
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
        `UPDATE topic set name=?, description=? WHERE id=?`,
        [data.name, data.description, data.tid],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        }
    )
}

const deleteTopic = (tid, callBack) => {
    let queries = `delete pl from post_label pl inner join post p on pl.pid=p.id inner join topic t on t.id=p.topic_id where t.id=?;`;
    queries += `delete from post where topic_id=?;`;
    queries += `delete from topic where id=?;`;

    mysql.query(
        queries, 
        [tid, tid, tid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
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

module.exports = { create, update, deleteTopic, getAll, getSubscriptions, getById, subscribe, unsubscribe }
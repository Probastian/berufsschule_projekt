const mysql = require("../../config/database");

/*
    Label functions
*/

const getAllLabels = (callBack) => {
    mysql.query(
        `SELECT * FROM label`,
        [],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const getLabelById = (pid, callBack) => {
    mysql.query(
        `select * from label where id=?`,
        [pid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result[0]);
        }
    )
}

const createLabel = (data, callBack) => {
    // TODO: Remove topic id (=tid) from this!
    mysql.query(
        `INSERT INTO label (name, topic_id) VALUES (?, ?)`,
        [data.name, data.tid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const deleteLabel = (labelId, callBack) => {
    mysql.query(
        `DELETE FROM label where id=?`,
        [labelId],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

module.exports = { getAllLabels, getLabelById, createLabel, deleteLabel }
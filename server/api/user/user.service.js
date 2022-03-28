const mysql = require("../../config/database");

const create = (data, callBack) => {
    mysql.query(
        `INSERT INTO user (username, email, firstname, lastname, password)
                    values (?, ?, ?, ?, ?)`,
        [data.username, data.email, data.firstname, data.lastname, data.password],
        (error, results) => {
            if (error) {
                return callBack(error);
            } 
            return callBack(null, results);
        }
    )
}

const getUserByUsername = (username, callBack) => {
    mysql.query(
        `SELECT * from user where username=? OR email=?`,
        [username, username],
        (error, results) => {
            if (error) {
                return callBack(error);
            } 
            return callBack(null, results[0]);
        }
    );
}

const getUserForLogin = (login, callBack) => {
    mysql.query(
        `SELECT * from user where username=? OR email=?`,
        [login, login],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0])
        }
    );
}

const updateUser = (data, callBack) => {
    mysql.query(
        `UPDATE user SET username=?, firstname=?, lastname=? where id=?`, 
        [data.username, data.firstname, data.lastname, data.uid],
        (error, results) => {
            if (error) {
                return callBack(error);
            } 
            return callBack(null, results[0]);
        }
    );
}

const deleteUser = (uid, callBack) => {
    mysql.query(
        `DELETE FROM user WHERE id=?`,
        [uid],
        (error) => {
            if (error) {
                return callBack(error);
            } 
            return callBack(null);
        }
    );
}

module.exports = { create, getUserByUsername, getUserForLogin, updateUser, deleteUser }
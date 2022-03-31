const mysql = require("../../config/database");

const create = (data, callBack) => {
    mysql.query(
        `INSERT INTO user (username, email, firstname, lastname, password)
                    values (?, ?, ?, ?, ?)`,
        [data.username, data.email, data.firstname, data.lastname, data.password],
        (error, result) => {
            if (error) {
                return callBack(error);
            } 
            return callBack(null, result);
        }
    )
}

const getAllUsers = (callBack) => {
    mysql.query(
        `SELECT * FROM user`,
        [],
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

const getUserById = (id, callBack) => {
    mysql.query(
        `SELECT * from user where id=?`,
        [id],
        (error, result) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, result[0])
        }
    )
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
    let queries = "DELETE FROM comment WHERE user_id=?;" 
    queries += "DELETE FROM post where user_id=?;"
    queries += "DELETE FROM topic where creator=?;"
    mysql.query(
        `DELETE FROM user WHERE id=?`,
        [uid],
        (error) => {
            if (error) {
                return callBack(error)
            }
        }
    );
}

module.exports = { create, getAllUsers, getUserByUsername, getUserById, getUserForLogin, updateUser, deleteUser }
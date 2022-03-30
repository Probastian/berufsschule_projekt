const mysql = require("../../config/database");

/*
    post function
*/

// Commencount subquery
// select count(id) as commentCount from comment where post_id=1

const getPostsByTopic = (tid, callBack) => {
    mysql.query(
        `select * from post p where p.topic_id=? order by p.creation_date desc`,
        [tid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const createPost = (uid, data, callBack) => {
    mysql.query(
        'insert into post(topic_id, user_id, name, content) values (?, ?, ?, ?)',
        [data.tid, uid, data.name, data.content],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const deletePost = (id, callBack) => {
    mysql.query('DELETE FROM post WHERE id=?',
    [id],
    (error, result) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, result);
    });
}

const getSubscriptionPosts = (uid, callBack) => {
    mysql.query(
        `select *, (select count(id) from comment where post_id=1) as commmentCount from post p left join topic_member tm on tm.tid=p.topic_id where tm.uid=? order by p.creation_date desc`,
        [uid],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
}

/*
    comment function
*/

const createComment = (uid, data, callBack) => {
    mysql.query(
        'INSERT INTO comment (user_id, post_id, text) values (?, ?, ?)',
        [uid, data.pid, data.text],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const deleteComment = (pid, callBack) => {
    mysql.query(
        'DELETE FROM comment where id=?',
        [pid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

module.exports = { getPostsByTopic, createPost, deletePost, getSubscriptionPosts, createComment, deleteComment }
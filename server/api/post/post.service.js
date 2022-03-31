const mysql = require("../../config/database");

/*
    post function
*/

const getPostsByTopic = (tid, callBack) => {
    mysql.query(
        `select *, (select count(id) from comment where post_id=p.id) as commentCount from post p where p.topic_id=? order by p.creation_date desc`,
        [tid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const getPostById = (pid, callBack) => {
    mysql.query(
        `select * from post where id=?`,
        [pid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result[0]);
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

const editPostById = (postId, data, callBack) => {
    mysql.query(
        'UPDATE post SET name=?, content=? WHERE id=?',
        [data.name, data.content, postId],
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
        `select p.*, (select count(id) from comment where post_id=p.id) as commmentCount from post p left join topic_member tm on tm.tid=p.topic_id where tm.uid=? order by p.creation_date desc`,
        [uid],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
}

const getDefaultHomePosts = (callBack) => {
    mysql.query(
        `select p.*, (select count(id) from comment where post_id=p.id) as commmentCount from post p order by creation_date desc`,
        [],
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

const getCommentsByPost = (pid, callBack) => {
    mysql.query(
        'SELECT * FROM comment WHERE post_id=?',
        [pid],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
}

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

const getLabelsForPost = (pid, callBack) => {
    mysql.query(
        `SELECT l.* FROM label l LEFT JOIN post_label pl on pl.lid=l.id where pl.pid=?`,
        [pid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const addLabel = (data, callBack) => {
    mysql.query(
        `INSERT INTO post_label() values (?, ?)`,
        [data.pid, data.lid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

const removeLabel = (data, callBack) => {
    mysql.query(
        `DELETE FROM post_label where pid=? AND lid=?`,
        [data.pid, data.lid],
        (error, result) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result);
        }
    )
}

module.exports = { getPostsByTopic, getPostById, createPost, editPostById, deletePost, getSubscriptionPosts, getDefaultHomePosts, getCommentsByPost, createComment, deleteComment, getAllLabels, getLabelsForPost, addLabel, removeLabel }
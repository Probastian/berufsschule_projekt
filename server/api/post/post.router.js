const router = require("express").Router();

const { getPostsByTopic, createPost, deletePost, getSubscriptions, createComment, deleteComment, addLabel, removeLabel }  = require('./post.controller');

// Post
router.get('/topic', getPostsByTopic);
router.get('/subs', getSubscriptions);
router.post('/create', createPost);
router.post('/delete', deletePost);

// comment
router.post('/comment/create', createComment);
router.post('/comment/delete', deleteComment);

//label
router.post('/label/add', addLabel);
router.post('/label/remove', removeLabel);

router.get('*', (req, res) => {
    return res.json({
        success: false,
        message: "This page does not exits."
    });
});
router.post('*', (req, res) => {
    console.log(req.url)

    return res.json({
        success: false,
        message: "This page does not exits."
    })
});

module.exports = router;
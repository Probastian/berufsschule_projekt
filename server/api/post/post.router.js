const router = require("express").Router();

const { getPostsByTopic, getPostById, createPost, deletePost, getSubscriptions, getComments, createComment, deleteComment, getAllLabels, addLabel, removeLabel } = require('./post.controller');

// Post
router.get('/topic/:id', getPostsByTopic);
router.get('/id/:id', getPostById);
router.post('/subs', getSubscriptions);
router.post('/create', createPost);
router.post('/delete', deletePost);

// comment
router.get('/comment/id/:id', getComments);
router.post('/comment/create', createComment);
router.post('/comment/delete', deleteComment);

//label
router.get('/labels', getAllLabels);
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
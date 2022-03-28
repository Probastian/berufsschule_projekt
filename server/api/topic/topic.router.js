const router = require("express").Router();

const { getAllTopics, getTopicById, createTopic, updateTopic, getSubscriptions, subscribe, unsubscribe } = require("./topic.controller");

router.get('/all', getAllTopics);
router.get('/:id', getTopicById);
router.get('/subs', getSubscriptions)

router.post("/create", createTopic);
router.post("/update", updateTopic);
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);

// Error handling for invalid urls
router.get('*', (req, res) => {
    return res.json({
        success: 0,
        message: "This page does not exits."
    });
});
router.post('*', (req, res) => {
    return res.json({
        success: 0,
        message: "This page does not exits."
    })
});


module.exports = router;
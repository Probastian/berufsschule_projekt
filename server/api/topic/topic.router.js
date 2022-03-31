const router = require("express").Router();

const { getAllTopics, getTopicById, createTopic, deleteTopic, updateTopic, getSubscriptions, subscribe, unsubscribe } = require("./topic.controller");

router.get('/all', getAllTopics);
router.get('/id/:id', getTopicById);
router.get('/subs', getSubscriptions)

router.delete('/', deleteTopic);

router.post("/create", createTopic);
router.post("/update", updateTopic);
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);

// Error handling for invalid urls
router.get('*', (req, res) => {
    return res.json({
        success: false,
        message: "This page does not exits."
    });
});
router.post('*', (req, res) => {
    return res.json({
        success: false,
        message: "This page does not exits."
    })
});


module.exports = router;
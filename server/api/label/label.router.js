const router = require("express").Router();

const { getAllLabels, getLabelById, createLabel, deleteLabel } = require('./label.controller');

router.get('/', getAllLabels);
router.get('/:id', getLabelById);
router.post('/', createLabel);
router.delete('/:id', deleteLabel);

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
const router = require("express").Router();

const { login, logout, createUser, getUserByUsername, updateUser, deleteUser } = require("./user.controller")

router.post("/login", login);
router.post("/logout", logout);

router.post("/create", createUser);
router.get("/:name", getUserByUsername);
router.post("/update", updateUser);
router.post("/delete", deleteUser);


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
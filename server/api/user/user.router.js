const router = require("express").Router();

const { login, logout, createUser, getAllUsers, getUserByUsername, getUserById, updateUser, deleteUser } = require("./user.controller")

router.post("/login", login);
router.post("/logout", logout);

router.get("/all", getAllUsers);
router.get("/name/:name", getUserByUsername);
router.get("/id/:id", getUserById);
router.post("/create", createUser);
router.post("/update", updateUser);
router.delete("/delete", deleteUser);


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
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require("../middleware/checkAuth");




router.get("/", (req, res) => {
    res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        user: req.user,
    });
});


router.get("/admin", ensureAdmin, (req, res) => {
    const session = req.sessionStore.sessions
    res.render("admin", {
        user: req.user,
        sessions: session
    })
})

module.exports = router;

//req.session.destroy();
//req.sessionStore.destroy();
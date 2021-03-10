const express = require("express");
const {Store} = require("express-session");
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
    const session = req.sessionStore.sessions;
    res.render("admin", {
        user: req.user,
        sessions: session
    })
});

router.post("/destroy/:key?", ensureAdmin, (req, res) => {
    //Do something here to revoke session
    req.sessionStore.destroy(req.params.key.replace(":",""));
    res.redirect("/admin");
});

module.exports = router;

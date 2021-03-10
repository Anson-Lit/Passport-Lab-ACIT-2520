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

router.post("/destroy/:key?", ensureAdmin, (req, res) => {
    //Do something here to revoke session
    var key = req.params.key
        // console.log("*********")
        // console.log(key)
        // console.log("******")
    let session = req.sessionStore.sessions
        // console.log("111111111111111111111111111111")
        // console.log(session)
    req.session.destroy(key)
        // console.log("22222222222222222222222222222222")
        // console.log(session)
    res.render("admin", {
        user: req.user,
        sessions: session
    })
})

module.exports = router;

//req.session.destroy();
//req.sessionStore.destroy();
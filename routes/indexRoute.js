const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require("../middleware/checkAuth");
// const { ensureAdmin } = require("../middleware/checkAuth");
router.get("/", (req, res) => {
    res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        user: req.user,
    });
});


router.get("/admin", ensureAdmin, (req, res) => {
    res.render("admin", {
        user: req.user
    })
})

module.exports = router;
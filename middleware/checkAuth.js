module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/auth/login");
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/dashboard");
    },
    ensureAdmin: function(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.admin) {
                return next();
            }
        }
        res.redirect("/auth/login")
    }
};
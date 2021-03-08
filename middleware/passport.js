const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userController = require("../controllers/userController");
require('dotenv').config();

const localLogin = new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        const user = userController.getUserByEmailIdAndPassword(email, password);
        return user ?
            done(null, user) :
            done(null, false, {
                message: "Your login details are not valid. Please try again",
            });
    }
);

const gitHubLogin = new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/github/callback"
    },
    (accessToken, refreshToken, profile, cb) => { // I think cb here is the same as done from local strat
        let user = userController.getUserByGitHubIdOrCreate(profile)
        return cb(null, user);
    }
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin).use(gitHubLogin);
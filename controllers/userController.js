const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
    let user = userModel.findOne(email);
    if (user) {
        if (isUserValid(user, password)) {
            return user;
        }
    }
    return null;
};
const getUserById = (id) => {

    let user = userModel.findById(id);
    if (user) {
        return user;
    }

    return null;
};

const getUserByGitHubIdOrCreate = (profile) => {
    try {
        let user = userModel.findById(profile.id);
        if (user) {
            return (null, user);
        }
    } catch (err) {
        let newUser = { id: profile.id, name: profile.displayName, admin: false};
        userModel.enterDatabase(newUser);
        return (null, newUser);
    }
};

function isUserValid(user, password) {
    return user.password === password;
}

module.exports = {
    getUserByEmailIdAndPassword,
    getUserById,
    getUserByGitHubIdOrCreate,
};

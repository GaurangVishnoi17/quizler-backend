const userService = require("../services/userService");

const getUserProfile = async (req, res, next) => {
    try {
        const userProfile = await userService.getUserProfile(req.user.userId);
        return res.status(200).json(userProfile);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUserProfile
};
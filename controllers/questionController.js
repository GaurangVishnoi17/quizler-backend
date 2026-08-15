const questionService = require("../services/questionService");

const getQuestions = async (req, res, next) => {
    try {
        const questions = await questionService.getQuestions();
        return res.status(200).json(questions);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getQuestions
};
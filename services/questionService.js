const { queryDb } = require("../database/query.js");


const getQuestions = async () => {
    const rows = await queryDb("SELECT question, answer FROM question_table");
    return rows;

}


module.exports = {
    getQuestions
};
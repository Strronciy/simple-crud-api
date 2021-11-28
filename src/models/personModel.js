const persons = require("../data/persons.js");

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(persons);
    });
};

module.exports = {
    findAll,
};

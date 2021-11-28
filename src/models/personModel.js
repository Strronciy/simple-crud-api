const persons = require("../data/persons.js");

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(persons);
    });
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const person = persons.find((p) => p.id === id);
        resolve(person);
    });
};

module.exports = {
    findAll,
    findById,
};

const persons = require("../data/persons.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

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

const create = (person) => {
    return new Promise((resolve, reject) => {
        const newPerson = { id: uuidv4(), ...person };
        persons.push(newPerson);
        writeDataToFile("./src/data/persons.js", persons);
        resolve(newPerson);
    });
};

module.exports = {
    findAll,
    findById,
    create,
};

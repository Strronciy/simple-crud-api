let persons = require("../data/persons.json");
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
        writeDataToFile("./src/data/persons.json", persons);
        resolve(newPerson);
    });
};

const update = (id, person) => {
    return new Promise((resolve, reject) => {
        const index = persons.findIndex((p) => p.id === id);
        persons[index] = { id, ...person };

        writeDataToFile("./src/data/persons.json", persons);
        resolve(persons[index]);
    });
};

const remove = (id) => {
    return new Promise((resolve, reject) => {
        persons = persons.filter((p) => p.id !== id);
        writeDataToFile("./src/data/persons.json", persons);
        resolve();
    });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};

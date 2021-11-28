const Person = require("../models/personModel");

const getPersons = async (req, res) => {
    try {
        const persons = await Person.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(persons));
    } catch (error) {
        console.log(error);
    }
};

const getPerson = async (req, res, id) => {
    try {
        const person = await Person.findById(id);
        if (person) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(person));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Person Not Found" }));
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getPersons,
    getPerson,
};

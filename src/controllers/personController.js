const Person = require("../models/personModel");

const { getPostData } = require("../utils");

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

const createPerson = async (req, res) => {
    try {
        const body = await getPostData(req);
        console.log(body);
        const { name, age, hobbies } = JSON.parse(body);

        const person = {
            name,
            age,
            hobbies,
        };

        const newPerson = await Person.create(person);
        res.writeHead(201, { "Content-Type": "application/json" });

        return res.end(JSON.stringify(newPerson));
    } catch (error) {
        console.log(error);
    }
};

const updatePerson = async (req, res, id) => {
    try {
        const person = await Person.findById(id);

        if (person) {
            const body = await getPostData(req);
            console.log(body);
            const { name, age, hobbies } = JSON.parse(body);

            const personData = {
                name: name || person.name,
                age: age || person.age,
                hobbies: hobbies || person.hobbies,
            };

            const updPerson = await Person.update(id, personData);
            res.writeHead(200, { "Content-Type": "application/json" });

            return res.end(JSON.stringify(updPerson));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Person Not Found" }));
        }
    } catch (error) {
        console.log(error);
    }
};

const deletePerson = async (req, res, id) => {
    try {
        const person = await Person.findById(id);
        if (person) {
            await Person.remove(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Person ${id} removed.` }));
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
    createPerson,
    updatePerson,
    deletePerson,
};

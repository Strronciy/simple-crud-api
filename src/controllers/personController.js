const Person = require("../models/personModel");

const { getPostData } = require("../utils");
const { validate } = require("uuid");

const getPersons = async (_, res) => {
    try {
        const persons = await Person.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(persons));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
};

const getPerson = async (_, res, id) => {
    if (!validate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "ID is invalid!" }));
    }
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
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
};

const createPerson = async (req, res) => {
    try {
        const body = await getPostData(req);
        const { name, age, hobbies } = JSON.parse(body);
        if (!name) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Name is required!" }));
        } else if (!age) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Age is required!" }));
        } else if (!hobbies) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(
                JSON.stringify({
                    message: 'Hobbies is required! (Could be "hobbies": [])',
                })
            );
        }

        const person = {
            name,
            age,
            hobbies,
        };

        const newPerson = await Person.create(person);
        res.writeHead(201, { "Content-Type": "application/json" });

        return res.end(JSON.stringify(newPerson));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
};

const updatePerson = async (req, res, id) => {
    if (!validate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "ID is invalid!" }));
    }
    try {
        const person = await Person.findById(id);

        if (person) {
            const body = await getPostData(req);
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
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
};

const deletePerson = async (_, res, id) => {
    if (!validate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "ID is invalid!" }));
    }
    try {
        const person = await Person.findById(id);
        if (person) {
            await Person.remove(id);
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Person ${id} removed.` }));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Person Not Found" }));
        }
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
};

module.exports = {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson,
};

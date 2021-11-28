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

module.exports = {
    getPersons,
};

const server = require("../server");
const request = require("supertest");
const { validate } = require("uuid");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

describe("E2E tests:", () => {
    server();
    afterAll(() => process.emit("closeServer"));

    const validPerson = {
        name: "Ivan",
        age: "41",
        hobbies: ["sport", "travel"],
    };

    test("- the valid GET request must return the empty array.", async () => {
        const res = await request(`http://localhost:${PORT}`).get("/person");
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toBeInstanceOf(Array);
        expect(JSON.parse(res.text)).toHaveLength(0);
    });

    test("- the valid POST request must return the copy of the created object.", async () => {
        const res = await request(`http://localhost:${PORT}`)
            .post("/person")
            .send(validPerson);
        expect(res.statusCode).toBe(201);
        const person = JSON.parse(res.text);
        expect(person).toBeInstanceOf(Object);
        expect(person).toHaveProperty("name", validPerson.name);
        expect(person).toHaveProperty("age", validPerson.age);
        expect(person).toHaveProperty("hobbies", validPerson.hobbies);
        expect(() => validate(person.id)).toBeTruthy();
        personId = person.id;
    });

    test("- the valid GET request with the valid id must return the person object.", async () => {
        const res = await request(`http://localhost:${PORT}`).get(
            `/person/${personId}`
        );
        expect(res.statusCode).toBe(200);
        const person = JSON.parse(res.text);
        expect(person).toBeInstanceOf(Object);
        expect(person).toHaveProperty("name", validPerson.name);
        expect(person).toHaveProperty("age", validPerson.age);
        expect(person).toHaveProperty("hobbies", validPerson.hobbies);
        expect(person.id).toBe(personId);
    });

    test("- the valid PUT request must return the copy of the changed object.", async () => {
        const updatedPerson = {
            name: "Vasya",
            age: "23",
            hobbies: ["beer"],
        };
        const res = await request(`http://localhost:${PORT}`)
            .put(`/person/${personId}`)
            .send(updatedPerson);
        expect(res.statusCode).toBe(200);
        const person = JSON.parse(res.text);
        expect(person).toBeInstanceOf(Object);
        expect(person).toHaveProperty("name", updatedPerson.name);
        expect(person).toHaveProperty("age", updatedPerson.age);
        expect(person).toHaveProperty("hobbies", updatedPerson.hobbies);
        expect(person.id).toBe(personId);
    });

    test("- the valid DELETE request must delete the person from the data base.", async () => {
        const baseBefore = await request(`http://localhost:${PORT}`).get(
            `/person`
        );
        expect(JSON.parse(baseBefore.text)).toHaveLength(1);
        const res = await request(`http://localhost:${PORT}`).delete(
            `/person/${personId}`
        );
        expect(res.statusCode).toBe(204);
        const baseAfter = await request(`http://localhost:${PORT}`).get(
            `/person`
        );
        expect(JSON.parse(baseAfter.text)).toHaveLength(0);
    });

    test("- the valid GET request after deleting must return status 404.", async () => {
        const res = await request(`http://localhost:${PORT}`).get(
            `/person/${personId}`
        );
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('{"message":"Person Not Found"}');
    });
});

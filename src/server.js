const http = require("http");

require("dotenv").config();
const {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson,
} = require("./controllers/personController");

const runServer = () => {
    const PORT = process.env.PORT || 5000;

    const server = http.createServer();

    server.on("request", (req, res) => {
        if (req.url === "/person" && req.method === "GET") {
            getPersons(req, res);
        } else if (
            req.url.match(
                /\/person\/([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i
            ) &&
            req.method === "GET"
        ) {
            const id = req.url.split("/")[2];
            getPerson(req, res, id);
        } else if (req.url === "/person" && req.method === "POST") {
            createPerson(req, res);
        } else if (
            req.url.match(
                /\/person\/([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i
            ) &&
            req.method === "PUT"
        ) {
            const id = req.url.split("/")[2];
            updatePerson(req, res, id);
        } else if (
            req.url.match(
                /\/person\/([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i
            ) &&
            req.method === "DELETE"
        ) {
            const id = req.url.split("/")[2];
            deletePerson(req, res, id);
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    message: "Route Not Found!",
                })
            );
        }
    });

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

    process.on("closeServer", () => {
        server.close();
    });
};

module.exports = runServer;

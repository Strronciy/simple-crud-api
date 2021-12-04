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

    const personUrlReqExp = /\/person\/.+/;

    const server = http.createServer();

    server.on("request", (req, res) => {
        const id = req.url.split("/")[2];
        if (req.url === "/person" && req.method === "GET") {
            getPersons(req, res);
        } else if (req.url.match(personUrlReqExp) && req.method === "GET") {
            getPerson(req, res, id);
        } else if (req.url === "/person" && req.method === "POST") {
            createPerson(req, res);
        } else if (req.url.match(personUrlReqExp) && req.method === "PUT") {
            updatePerson(req, res, id);
        } else if (req.url.match(personUrlReqExp) && req.method === "DELETE") {
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

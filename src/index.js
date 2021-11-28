const http = require("http");
require("dotenv").config();
const { getPersons } = require("./controllers/personController");

const PORT = process.env.PORT || 5000;

const server = http.createServer();

server.on("request", (req, res) => {
    if (req.url === "/person" && req.method === "GET") {
        getPersons(req, res);
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

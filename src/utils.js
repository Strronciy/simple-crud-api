const fs = require("fs");
const { resolve } = require("path");

const writeDataToFile = (filepath, content) => {
    fs.writeFileSync(filepath, JSON.stringify(content), "utf8", (err) => {
        if (err) {
            console.log(err);
        }
    });
};

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    writeDataToFile,
    getPostData,
};

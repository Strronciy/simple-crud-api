const path = require("path");
const Dotenv = require("dotenv-webpack");
require("dotenv").config();

const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: "./src/index.js",
    devServer: {
        port: process.env.PORT,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    target: "node",
    module: {},
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};

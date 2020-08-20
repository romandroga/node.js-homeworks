const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const contactsRouter = require("./routes/contactsRouter");
const connectMongoDB = require("./database");

dotenv.config();

const server = async (port, callback) => {
  try {
    const app = express();

    const schemas = await connectMongoDB();

    app.use(cors());

    app.use(morgan("combined"));

    app.use(bodyParser.json());

    app.use((req, res, next) => {
      req.mongoDB = schemas;

      next();
    });

    app.use("/api", contactsRouter);

    app.listen(port, callback);
  } catch (e) {
    console.log(e);
  }
};

module.exports = server;

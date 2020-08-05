const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const  contactsRouter = require("./routes/contactsRouter");

dotenv.config();

const app = express();

app.use(cors())

app.use(morgan("combined"));


app.use(bodyParser.json());

app.use("/api", contactsRouter);


module.exports = { app };

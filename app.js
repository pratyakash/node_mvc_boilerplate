const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const test_router = require("./routes/test");

// * MiddleWares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

//Routes
app.use("/api/test", test_router);

module.exports = app;

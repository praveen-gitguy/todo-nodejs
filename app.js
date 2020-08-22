const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const globalErrorHandler = require("./Controllers/errorController");

const todoRoutes = require("./Routes/todoRoutes");
const userRoutes = require("./Routes/userRoutes");

app.use(morgan("tiny"));
app.use(cors("Access-Control-Allow-Credentials"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

app.use(globalErrorHandler);

module.exports = app;

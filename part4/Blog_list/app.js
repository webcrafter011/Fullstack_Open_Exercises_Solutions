const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

const app = express();

logger.info("Connecting to database..");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("successfully connected to database."))
  .catch((error) => logger.error("Error connecting database: ", error));

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
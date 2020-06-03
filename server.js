const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./src/_helpers/error_handler");
const routes = require("./src/routes");

const PORT = process.env.PORT || 3000;

let app = express();

app.use(morgan("tiny"));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

module.exports = { app };

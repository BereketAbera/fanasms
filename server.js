const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./src/_helpers/error_handler");
const routes = require("./src/routes");

const PORT = process.env.PORT || 3000;

let app = express();


var whitelist = [
  "http://localhost:4200",
  "http://192.168.0.103:4200",
  "192.168.0.103:4200"
];
var corsOptionsDelegate = {
  origin: function(origin, callback) {
    // console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      corsOptions = { origin: true,credentials:true } 
    } else {
      callback(new Error("Not allowed by CORS"));
    }
    callback(null, corsOptions)
  },

};

app.use(cors({
  origin:['http://192.168.0.103:4200', "http://localhost:4200" ] ,
  credentials: true,
}));

const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use(morgan("tiny"));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  // console.log(io,'s')
  req['io'] = io;
  next();
});

app.use(routes);

app.use(errorHandler);
// io.use(routes)

io.on('connection', (socket) => {
  console.log("Connected");
  socket.emit("message",{msg:"You are Connected"})
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});


module.exports = { app,io };

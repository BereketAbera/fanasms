const app = (module.exports = require("express")());

const userController = require("../controllers/user.controller");

app.post("/create_user",userController.create_user) ;
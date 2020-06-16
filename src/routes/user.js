
const app = (module.exports = require("express")());
const userController = require("../controllers/user.controller");
const adminController = require("../controllers/admin.controller");
const jwtService = require("../services/jwt.service");

app.get("/messages",jwtService.isAuthenticated, adminController.getUserMessage);

const app = (module.exports = require("express")());

const userController = require("../controllers/user.controller");
const adminController = require("../controllers/admin.controller");

app.post("/create_user",userController.create_user) ;
app.post("/create_code",adminController.create_code);
app.post("/create_key",adminController.create_key);

app.get("/users",userController.getUser);
app.get("/user/:id",userController.getOneUser);
// app.get("/")

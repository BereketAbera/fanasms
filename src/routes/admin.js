const app = (module.exports = require("express")());

const userController = require("../controllers/user.controller");
const adminController = require("../controllers/admin.controller");
const jwtService = require("../services/jwt.service");

app.post("/create_user",userController.create_user) ;
app.post("/create_code",adminController.create_code);
app.post("/create_key",adminController.create_key);
app.post("/vote_group",adminController.createVoteGroup);
app.post("/vote",adminController.createVoteOption);
app.post("/vote_options",adminController.createVoteOptions)

app.get("/users",userController.getUser);
app.get("/user/:id",jwtService.isAuthenticated, userController.getOneUser);
app.get("/voteOption/:id",adminController.getVoteOption);
app.get("/voteGroup",adminController.getGroupOption);
app.get("/shortcode/pagination",adminController.getShortCodeWithPagination);
app.get("/shortcodes",adminController.getShortCode);


app.get("/voteGroup/detail/:id",adminController.getVoteGroupDetails);

app.get("/messages",adminController.getAllMessage);
app.get("/usermessage",jwtService.isAuthenticated, adminController.getUserMessage);

app.put("/user/deactivate",userController.deactivateUser);
app.put("/shortcode",adminController.editShortCode);
app.put("/voteGroup/edit",adminController.editVoteGroup);
app.put("/voteGroup/close/:id",adminController.closeVoteGroup);

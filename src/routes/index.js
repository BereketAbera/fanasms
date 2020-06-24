const app = (module.exports = require("express")());
const jwtService = require("../services/jwt.service");
const adminController = require("../controllers/admin.controller");

app.use("/api/auth", require("./auth"));

app.use("/api/admin",jwtService.isAdminGuard, require("./admin"));
app.use("/api/user", require("./user"));
app.use("/api/sms",require("./sms"));
app.get("/api/votes/:id",adminController.getVotesAPI2)
app.get("/api/v2/votes/:id",adminController.getVotesAPI)

// the catch all route
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "not found" });
});

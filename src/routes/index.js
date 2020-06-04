const app = (module.exports = require("express")());

app.use("/api/auth", require("./auth"));

app.use("/api/admin", require("./admin"));

app.use("/api/sms", require("./sms"));

// the catch all route
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "not found" });
});

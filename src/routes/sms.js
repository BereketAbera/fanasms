const app = (module.exports = require("express")());

const sms = require("../controllers/sms.controller");

// const {io} = require("../../server")
app.get("/", sms.incomingSms, sms.userSms, sms.voteSms);

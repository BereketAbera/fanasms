const app = (module.exports = require("express")());

const sms = require("../controllers/sms.controller");

app.get("/", sms.incomingSms, sms.userSms, sms.voteSms);

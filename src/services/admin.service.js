const { ShortCode } = require("../models");

function addShortCode(shortCode) {
  return ShortCode.create(shortCode).catch((err) => console.log(err));
}

module.exports = {
  addShortCode,
};

const { ShortCode,UniqueKey } = require("../models");

function addShortCode(shortCode) {
  return ShortCode.create(shortCode).catch((err) => console.log(err));
}

function addKey(key){
  return UniqueKey.create(key).catch((err) => console.log(err));
}

module.exports = {
  addShortCode,
  addKey
};

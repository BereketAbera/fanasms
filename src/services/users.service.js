const { ShortCode, User } = require("../models");


function getUserByUserName(username) {
  return User.findOne({ where: { username } }).catch((err) => console.log(err));
}
function addShortCode(shortCode) {
  return ShortCode.create(shortCode).catch((err) => console.log(err));
}
function createUser(user) {
  return User.create(user).catch(err => console.log(err));
}

module.exports = {
  addShortCode,
  getUserByUserName,
  createUser
};

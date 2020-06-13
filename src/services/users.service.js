const { ShortCode, User } = require("../models");

function getUserByUserName(username) {
  return User.findOne({ where: { username } }).catch((err) => console.log(err));
}
function addShortCode(shortCode) {
  return ShortCode.create(shortCode).catch((err) => console.log(err));
}
function createUser(user) {
  return User.create(user).catch((err) => console.log(err));
}

function getAllUsers(page, perPage) {
  return User.findAndCountAll({
    offset: (page - 1) * perPage,
    limit: perPage,
  }).catch((err) => console.log(err));
}

function getUserById(id) {
  return User.findOne({ where: { id } }).catch((err) => console.log(err));
}

function changeUserStatus(user,status) {
  return user.update({ status: status }).catch((err) => console.log(err));
}

module.exports = {
  addShortCode,
  getUserByUserName,
  createUser,
  getAllUsers,
  getUserById,
  changeUserStatus,
};

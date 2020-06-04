const {
  Message,
  User,
  UsersInbox,
  VoteOption,
  VotesInbox,
} = require("../models");

function addMessage(message) {
  return Message.create(message).catch((err) => console.log(err));
}

function getUserWithKey(key) {
  return User.findOne({ where: { key, status: 1 } }).catch((err) =>
    console.log(err)
  );
}

function addUserInbox(message) {
  return UsersInbox.create(message).catch((err) => console.log(err));
}

function getVoteOptionWithKey(key) {
  return VoteOption.findOne({ where: { key, status: 1 } }).catch((err) =>
    console.log(err)
  );
}

function addVoteInbox(message) {
  return VotesInbox.create(message).catch((err) => console.log(err));
}

module.exports = {
  addMessage,
  getUserWithKey,
  addUserInbox,
  getVoteOptionWithKey,
  addVoteInbox,
};

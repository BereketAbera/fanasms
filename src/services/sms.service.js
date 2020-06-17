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

function getUserWithKey(key, code) {
  return User.findOne({ where: { key, code, status: 1 } }).catch((err) =>
    console.log(err)
  );
}

function getUserInfoWithKey(key) {
  return User.findOne({ where: { key, status: 1 } }).catch((err) =>
    console.log(err)
  );
}

function addUserInbox(message) {
  return UsersInbox.create(message).catch((err) => console.log(err));
}

function getVoteOptionWithKey(key, code) {
  return VoteOption.findOne({ where: { key, code, status: 1 } }).catch((err) =>
    console.log(err)
  );
}

function addVoteInbox(message) {
  return VotesInbox.create(message).catch((err) => console.log(err));
}

function getVote(UniqueKeyId, phoneNumber) {
  return VotesInbox.findOne({
    where: { UniqueKeyId, phoneNumber },
  }).catch((err) => console.log(err));
}

function getVoteInfoOptionWithKey(key) {
  return VoteOption.findOne({ where: { key, status: 1 } }).catch((err) =>
    console.log(err)
  );
}

function incerementCount(id) {
  return VoteOption.increment('count', { where: { id } }).catch((err) =>
    console.log(err)
  );
}

module.exports = {
  addMessage,
  getUserWithKey,
  addUserInbox,
  getVoteOptionWithKey,
  addVoteInbox,
  incerementCount,
  getVote,
  getVoteInfoOptionWithKey,
  getUserInfoWithKey,
};

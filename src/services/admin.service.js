const {
  ShortCode,
  UniqueKey,
  VoteGroup,
  VoteOption,
  VotesInbox,
  Message,
  UsersInbox
} = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
function addShortCode(shortCode) {
  return ShortCode.create(shortCode).catch(err => console.log(err));
}

function addKey(key) {
  return UniqueKey.create(key).catch(err => console.log(err));
}
function getKeyByKeyname(keys) {
  return UniqueKey.findOne({ where: { key: keys, status: 1 } }).catch(err =>
    console.log(err)
  );
}
function getKeyById(id) {
  return UniqueKey.findOne({ where: {  id } }).catch(err =>
    console.log(err)
  );
}
function checkKeyStatus(keys, status) {
  return UniqueKey.findOne({
    where: { key: keys, status: status }
  }).catch(err => console.log(err));
}

function getCodebyName(code) {
  return ShortCode.findOne({ where: { code: code } }).catch(err =>
    console.log(err)
  );
}

function getVoteGroupbyId(id) {
  return VoteGroup.findOne({ where: { id: id } }).catch(err =>
    console.log(err)
  );
}

function createVoteGroup(voteGroup) {
  return VoteGroup.create(voteGroup).catch(err => console.log(err));
}

function createVoteOption(vote) {
  return VoteOption.create(vote).catch(err => console.log(err));
}

async function getVoteOptionByVoteGroupId(id) {
  return VoteOption.findAll({
    where: { VoteGroupId: id }
  });
}

function countVote(id) {
  return VotesInbox.count({ where: { uniqueKeyId: id } }).catch(err =>
    console.log(err)
  );
}

function getAllVoteGroups(offset, limit, sortDirection, sortActive) {
  return VoteGroup.findAndCountAll({
    offset,
    limit,
    order: [[`${sortActive}`, `${sortDirection}`]]
  }).catch(err => console.log(err));
}

function getAllShortCodes() {
  return ShortCode.findAll().catch(err => console.log(err));
}

function getAllShortCodesWithOffset(offset, limit) {
  return ShortCode.findAndCountAll({ offset, limit }).catch(err =>
    console.log(err)
  );
}

function getAllMessages(offset, limit, date, message, phonenumber) {
  // console.log(message, phonenumber, moment(date).format('YYYY-MM-DD hh:mm:ss'), moment(date).add(24, 'hours').format('YYYY-MM-DD hh:mm:ss'));
  var dates = moment(date);

  if (dates.isValid()) {
    return Message.findAndCountAll({
      where: {
        [Op.and]: [
          { message: { [Op.like]: "%" + message + "%" } },
          { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
        ],
        receivedDate: {
          [Op.gte]: moment(date).format("YYYY-MM-DD hh:mm:ss"),
          [Op.lte]: moment(date)
            .add(24, "hours")
            .format("YYYY-MM-DD hh:mm:ss")
        }
      },
      offset,
      limit
    }).catch(err => console.log(err));
  } else {
    return Message.findAndCountAll({
      where: {
        [Op.and]: [
          { message: { [Op.like]: "%" + message + "%" } },
          { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
        ]
      },
      offset,
      limit
    }).catch(err => console.log(err));
  }
}
function getUserMessages(id, offset, limit) {
  return UsersInbox.findAndCountAll({
    where: {
      uniqueKeyId: id
    },
    offset,
    limit
  }).catch(err => console.log(err));
}
function getUserMessages2(id, offset, limit, date, message, phonenumber) {
  // console.log(message, phonenumber, moment(date).format('YYYY-MM-DD hh:mm:ss'), moment(date).add(24, 'hours').format('YYYY-MM-DD hh:mm:ss'));
  var dates = moment(date);
  if (dates.isValid()) {
    return UsersInbox.findAndCountAll({
      where: {
        uniqueKeyId: id,
        [Op.and]: [
          { message: { [Op.like]: "%" + message + "%" } },
          { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
        ],
        receivedDate: {
          [Op.gte]: moment(date).format("YYYY-MM-DD hh:mm:ss"),
          [Op.lte]: moment(date)
            .add(24, "hours")
            .format("YYYY-MM-DD hh:mm:ss")
        }
      },
      offset,
      limit,
      order: [["createdAt", "DESC"]]
    }).catch(err => console.log(err));
  } else {
    return UsersInbox.findAndCountAll({
      where: {
        uniqueKeyId: id,
        [Op.and]: [
          { message: { [Op.like]: "%" + message + "%" } },
          { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
        ]
      },
      offset,
      limit,
      order: [["createdAt", "DESC"]]
    }).catch(err => console.log(err));
  }
}

function getShortCodeById(id) {
  return ShortCode.findOne({ where: { id } }).catch(err => console.log(err));
}
function updateShortCode(shortCode, msg) {
  return shortCode.update({defaultReply:msg}).catch(err => console.log(err));
}

function updateVoteGroup(votegroup, body) {
  return votegroup.update(body).catch(err => console.log(err));
}

function updateVoteOptionStatus(vote) {
  return vote.update({ status: 0 }).catch(err => console.log(err));
}

function changeKeyStatus(key, status) {
  return key.update({ status: status }).catch(err => console.log(err));
}

function getVoteOptionById(id) {
  return VoteOption.findOne({ where: { id } }).catch(err => console.log(err));
}

function editVoteOption(voteoptions, body) {
  return voteoptions.update(body).catch(err => console.log(err));
}

function destroyVoteOption(id) {
  return VoteOption.destroy({
    where: { id }
  }).catch(err => console.log(err));;
}

function destroyKey(id) {
  // console.log(id)
  return UniqueKey.destroy({
    where: { id }
  }).catch(err => console.log(err));;
}

module.exports = {
  addShortCode,
  addKey,
  getCodebyName,
  getKeyByKeyname,
  checkKeyStatus,
  changeKeyStatus,
  createVoteGroup,
  createVoteOption,
  getVoteGroupbyId,
  getVoteOptionByVoteGroupId,
  getAllVoteGroups,
  getAllShortCodes,
  getAllShortCodesWithOffset,
  getAllMessages,
  getUserMessages,
  getUserMessages2,
  getShortCodeById,
  updateShortCode,
  updateVoteGroup,
  updateVoteOptionStatus,
  countVote,
  getVoteOptionById,
  editVoteOption,
  destroyVoteOption,
  getKeyById,
  destroyKey
};

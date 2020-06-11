const { ShortCode, UniqueKey, VoteGroup, VoteOption, Message, UsersInbox } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
function addShortCode(shortCode) {
  return ShortCode.create(shortCode).catch((err) => console.log(err));
}

function addKey(key) {
  return UniqueKey.create(key).catch((err) => console.log(err));
}
function getKeyByKeyname(keys) {
  return UniqueKey.findOne({ where: { key: keys, status: 1 } }).catch((err) => console.log(err));
}

function getCodebyName(code) {
  return ShortCode.findOne({ where: { code: code } }).catch((err) => console.log(err));
}

function getVoteGroupbyId(id) {
  return VoteGroup.findOne({ where: { id: id } }).catch((err) => console.log(err));
}

function createVoteGroup(voteGroup) {
  return VoteGroup.create(voteGroup).catch((err) => console.log(err));
}

function createVoteOption(vote) {
  return VoteOption.create(vote).catch((err) => console.log(err));
}

function getVoteOptionByVoteGroupId(id) {
  return VoteOption.findAll({ where: { VoteGroupId: id } }).catch((err) => console.log(err));
}

function getAllVoteGroups(offset, limit, sortDirection, sortActive) {
  return VoteGroup.findAndCountAll({ offset, limit, order: [[`${sortActive}`, `${sortDirection}`]], }).catch((err) => console.log(err));
}

function getAllShortCodes() {
  return ShortCode.findAll().catch((err) => console.log(err));
}

function getAllShortCodesWithOffset(offset, limit) {
  return ShortCode.findAndCountAll({ offset, limit }).catch((err) => console.log(err));
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
        ], receivedDate: {
          [Op.gte]: moment(date).format('YYYY-MM-DD hh:mm:ss'),
          [Op.lte]: moment(date).add(24, 'hours').format('YYYY-MM-DD hh:mm:ss'),
        }
      }, offset, limit
    }).catch((err) => console.log(err));
  } else {
    return Message.findAndCountAll({
      where: {
        [Op.and]: [
          { message: { [Op.like]: "%" + message + "%" } },
          { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
        ]
      }, offset, limit
    }).catch((err) => console.log(err));
  }
}
function getUserMessages(id, offset, limit) {
  return UsersInbox.findAndCountAll({
    where: {
      uniqueKeyId: id
    }, offset, limit
  }).catch((err) => console.log(err));
}
function getUserMessages2(id, offset, limit, date, message, phonenumber) {
  // console.log(message, phonenumber, moment(date).format('YYYY-MM-DD hh:mm:ss'), moment(date).add(24, 'hours').format('YYYY-MM-DD hh:mm:ss'));
  var dates = moment(date);
  if (dates.isValid()) {
    return UsersInbox.findAndCountAll({
      where: {
        uniqueKeyId: id, [Op.and]: [
          { message: { [Op.like]: "%" + message + "%" } },
          { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
        ], receivedDate: {
          [Op.gte]: moment(date).format('YYYY-MM-DD hh:mm:ss'),
          [Op.lte]: moment(date).add(24, 'hours').format('YYYY-MM-DD hh:mm:ss'),
        }
      }, offset, limit
    }).catch((err) => console.log(err));
  } else {
    return UsersInbox.findAndCountAll({
      where: {
        uniqueKeyId: id, [Op.and]: [
          { message: { [Op.like]: "%" + message + "%" } },
          { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
        ]
      }, offset, limit
    }).catch((err) => console.log(err));
  }

}

function getShortCodeById(id) {
  return ShortCode.findOne({ where: { id } }).catch((err) => console.log(err));
}
function updateShortCode(shortCode, body) {
  return shortCode.update(body).catch((err) => console.log(err));
}

function updateVoteGroup(votegroup, body) {
  return votegroup.update(body).catch((err) => console.log(err));
}

function updateVoteOptionStatus(vote) {
  return vote.update({status:0}).catch((err) => console.log(err));
}

module.exports = {
  addShortCode,
  addKey,
  getCodebyName,
  getKeyByKeyname,
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
  updateVoteOptionStatus
};

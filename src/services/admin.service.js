const { ShortCode,UniqueKey,VoteGroup,VoteOption } = require("../models");

function addShortCode(shortCode) {
  return ShortCode.create(shortCode).catch((err) => console.log(err));
}

function addKey(key){
  return UniqueKey.create(key).catch((err) => console.log(err));
}
function getKeyByKeyname(keys){
  return UniqueKey.findOne({where:{key:keys,status:1}}).catch((err) => console.log(err));
}

function getCodebyName(code){
  return ShortCode.findOne({where:{code:code}}).catch((err) => console.log(err));
}

function getVoteGroupbyId(id){
  return VoteGroup.findOne({where:{id:id}}).catch((err) => console.log(err));
}

function createVoteGroup(voteGroup){
  return VoteGroup.create(voteGroup).catch((err) => console.log(err));
}

function createVoteOption(vote){
  return VoteOption.create(vote).catch((err) => console.log(err));
}

module.exports = {
  addShortCode,
  addKey,
  getCodebyName,
  getKeyByKeyname,
  createVoteGroup,
  createVoteOption,
  getVoteGroupbyId
};

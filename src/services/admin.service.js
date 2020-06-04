const { ShortCode,UniqueKey } = require("../models");

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

module.exports = {
  addShortCode,
  addKey,
  getCodebyName,
  getKeyByKeyname
};

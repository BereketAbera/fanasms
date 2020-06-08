const userService = require("../services/users.service");
const adminService = require("../services/admin.service");

function create_code(req, res, next) {
  createCodeHandler(req.body)
    .then((code) => res.status(200).send({ shortCode: code }))
    .catch((err) => res.status(500).send({ message: err }));
}


async function createCodeHandler(body) {
  const checkExit = await adminService.getCodebyName(body.code);
  if (checkExit) {
    throw "Code is already Exist"
  }
  const code = adminService.addShortCode(body);
  if (code) {
    return code;
  }
}

function create_key(req, res, next) {
  createKeyHandler(req.body)
    .then((code) => res.status(200).send({ key: code }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function createKeyHandler(body) {
  const code = adminService.addKey(body);
  if (code) {
    return code;
  }
}

function createVoteGroup(req, res, next) {
  createVoteGroupHandler(req.body)
    .then((resp) => res.status(200).send({ voteGroup: resp }))
    .catch((err) => res.status(500).send({ message: err }));
}


async function createVoteGroupHandler(body) {
  const shortcode = await adminService.getCodebyName(body.code);
  if (!shortcode) {
    throw "no code exit with name";
  }

  body["ShortCodeId"] = shortcode.id;

  const createVoteGroup = await adminService.createVoteGroup(body);
  if (!createVoteGroup) {
    throw "Not created! try again";
  }
  return createVoteGroup;
}


function createVoteOption(req, res, next) {
  createVoteOptionHandler(req.body)
    .then((resp) => res.status(200).send({ vote: resp }))
    .catch((err) => res.status(500).send({ message: err }));
}


async function createVoteOptionHandler(body) {
  const key = await adminService.getKeyByKeyname(body.key);
  const shortcode = await adminService.getCodebyName(body.code);
  if (key || !shortcode) {
    throw "Key already exist/ no code exit with name";
  }

  // const voteGroup = await adminService.getVoteGroupbyId(body.voteGroupId);
  const createKey = await adminService.addKey({ key: body.key, type: "VOTE" });

  body["UniqueKeyId"] = createKey.id;
  body['VoteGroupId'] = 1;

  const createVote = await adminService.createVoteOption(body);
  if (!createVote) {
    throw "Not created! try again";
  }
  return createVote;
}


function getGroupOption(req, res, next) {
  getVoteGroupAll()
    .then((resp) => res.status(200).send({ vote: resp }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function getVoteGroupAll() {
  const votegroups = await adminService.getAllVoteGroups();
  if (!votegroups) {
    throw "Didn't Fetch from API"
  }
  return votegroups;
}

function getVoteOption(req, res, next) {
  getVoteOptionByVoteGroupId(req.params.id)
    .then((resp) => res.status(200).send({ vote: resp }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function getVoteOptionByVoteGroupId(id) {
  const voteOption = await adminService.getVoteOptionByVoteGroupId(id);
  if (!voteOption) {
    throw "No VoteOption Found"
  }
  return voteOption;

}

function getShortCode(req, res, next) {
  getAllShortCode()
    .then((resp) => res.status(200).send({ code: resp }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function getAllShortCode() {
  const shortcode = await adminService.getAllShortCodes();
  if (!shortcode) {
    throw "Unable to fetch shortcodes"
  }
  return shortcode;
}

function getAllMessage(req, res, next) {
  getAllMessageHandler()
    .then((resp) => res.status(200).send({ message: resp }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function getAllMessageHandler(){
  const message = await adminService.getAllMessages();
  if(!message){
    throw "unable to fetch messages"
  }
  return message;
}

function getUserMessage(req, res, next) {
  getUserMessageHandler(req.params.id)
    .then((resp) => res.status(200).send({ message: resp }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function getUserMessageHandler(id){
  const message = await adminService.getUserMessages(id);
  if(!message){
    throw "unable to fetch messages"
  }
  return message;
}

function editShortCode(req,res,next){
  editShortCodeHandler(req.body)
    .then((resp) => res.status(200).send({ message: resp }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function editShortCodeHandler(body){
  const shortcode= await adminService.getShortCodeById(body.id);
  if(!shortcode){
    throw "Not short code exist by this id"
  }
  const updatecode = await adminService.updateShortCode(shortcode,body);
  if(updatecode){
    return updatecode;
  }
  throw "Un able to update"
}


module.exports = {
  create_code,
  create_key,
  createVoteGroup,
  createVoteOption,
  getGroupOption,
  getShortCode,
  getVoteOption,
  getAllMessage,
  getUserMessage,
  editShortCode
};

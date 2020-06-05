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

module.exports = {
  create_code,
  create_key,
  createVoteGroup,
  createVoteOption
};

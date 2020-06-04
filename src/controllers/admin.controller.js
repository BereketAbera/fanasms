const userService = require("../services/users.service");
const adminService = require("../services/admin.service");

function create_code(req, res, next) {
  createCodeHandler(req.body)
    .then((code) => res.status(200).send({ shortCode: code }))
    .catch((err) => res.status(500).send({ message: err }));
}


async function createCodeHandler(body){
  const code= adminService.addShortCode(body);
  if(code){
    return code;
  }
}

function create_key(req, res, next) {
  createKeyHandler(req.body)
    .then((code) => res.status(200).send({ shortCode: code }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function createKeyHandler(body){
  const code= adminService.addKey(body);
  if(code){
    return code;
  }
}


module.exports = {
  create_code,
  create_key
};

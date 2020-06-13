const userService = require("../services/users.service");
const adminService = require("../services/admin.service");

const { validateAccount, validateUser } = require("../_helpers/validator");
const CONSTANTS = require("../../constant.js");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcryptjs = require("bcryptjs");

function login(req, res, next) {
  const valid = validateAccount(req.body);
  if (valid != true) {
    res.status(422).json({ validationError: valid });
    return;
  }
  authenticationHandler(req.body)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(403).send({ message: err }));
}

async function authenticationHandler({ username, password }) {
  // console.log({ username, password });
  const user = await userService.getUserByUserName(username);
  if (!user) {
    throw "username or password incorrect";
  }

  const pass = bcryptjs.compareSync(password, user.password);

  if (!pass) {
    throw "username or password incorrect";
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role, key: user.key },
    CONSTANTS.JWTSECRET,
    { expiresIn: "24h" }
  );
  return {
    role: user.role,
    name: user.fullName,
    username: user.username,
    email: user.email,
    code: user.code,
    replyMessage: user.replyMessage,
    expiresIn: 86400,
    token: token,
  };
}

function create_user(req, res, next) {
  const valid = validateUser(req.body);
  if (!valid) {
    res.status(500).json({ validationError: valid });
    return;
  }

  handleCreateUser(req.body)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function handleCreateUser(body) {
  const users = await userService.getUserByUserName(body.username);
  if (users) {
    throw "Username/Email is already in use";
  }

  const key = await adminService.getKeyByKeyname(body.key);
  const shortcode = await adminService.getCodebyName(body.code);
  if (key || !shortcode) {
    throw "Key already exist/ no code exit with name";
  }

  const createKey = await adminService.addKey({ key: body.key, type: "USER" });

  body["role"] = "USER";
  body["UniqueKeyId"] = createKey.id;
  body["ShortCodeId"] = shortcode.id;
  const createdUser = await userService.createUser(body);

  if (!createdUser && !createKey) {
    throw "something went wrong";
  }

  let updatedUser = _.omit(createdUser.dataValues, ["password"]);
  return { ...updatedUser };
}

function getUser(req, res, next) {
  let page = parseInt(req.query.page) || 1;
  let perPage = parseInt(req.query.perPage) || 5;
  getAllUsers(page, perPage)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function getAllUsers(page, perPage) {
  const user = userService.getAllUsers(page, perPage);
  if (!user) {
    throw "no User exist";
  }
  return user;
}

function getOneUser(req, res, next) {
  getUserById(req.params.id)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function getUserById(id) {
  const user = await userService.getUserById(id);
  if (!user) {
    throw "User doesn't exist";
  }
  return user;
}

function changeUserStatus(req, res, next) {
  changeUserStatusById(req.body)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(400).send({ message: err }));
}

async function changeUserStatusById(body) {
  // console.log(body);
  /** status 
  0 deactivateUser
  1 activate
  2 suspendUse
  **/
  const user = await userService.getUserById(body.id);
  if (!user) {
    throw "User not Found";
  }
  const users = await userService.changeUserStatus(user, body.status);
  const keys = await adminService.getKeyByKeyname(user.key);
  if (keys && users.status == 0) {
    const freekey = await adminService.changeKeyStatus(keys,0);
  }
  if(users.status == 1){
    const keysStatus = await adminService.checkKeyStatus(user.key,0);
    if(keysStatus){
      const takeKey = await adminService.changeKeyStatus(keysStatus,1);
    }
    else{
      throw "This key Taken"
    }
  }
  if (!users) {
    throw "Internal Server error";
  }
  return users;
}

function suspendUser(req, res, next) {
  suspendUserById(req.params.id)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function suspendUserById(id) {
  const user = await userService.getUserById(id);
  if (!user) {
    throw "User not Found";
  }
  const users = await userService.deactivateUser(user);
  if (!users) {
    throw "Internal Server error";
  }
  return users;
}


module.exports = {
  login,
  create_user,
  getUser,
  getOneUser,
  getUserById,
  changeUserStatus,
  suspendUser
};

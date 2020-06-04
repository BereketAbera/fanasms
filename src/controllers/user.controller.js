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
  console.log({ username, password });
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
    success: true,
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
  getAllUsers()
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function getAllUsers() {
  const user = userService.getAllUsers();
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

module.exports = {
  login,
  create_user,
  getUser,
  getOneUser,
  getUserById,
};

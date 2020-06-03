const userService = require("../services/users.service");
const {
  validateAccount,
  validateUser
} = require('../_helpers/validator');
const CONSTANTS = require('../../constant.js');
const jwt = require('jsonwebtoken');
const _ = require("lodash");

function login(req, res, next) {
  const valid = validateAccount(req.body);
  if (valid != true) {
    res.status(500).json({ validationError: valid });
    return;
  }
  authenticationHandler()
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: err }));
}

async function authenticationHandler({ email, password }) {
  const user = await userService.getUserByUserName(email);

  if (!user) {
    throw "Email or Password incorrect";
  }

  const pass = bcryptjs.compareSync(password, user.password);

  if (!pass) {
    throw "email or password incorrect";
  }

  const token = jwt.sign({ sub: user.id, role: user.role, key: user.key }, CONSTANTS.JWTSECRET, { expiresIn: '24h' });
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

async function handleCreateUser(body){
  console.log(body)
  const users = await userService.getUserByUserName(body.username);
  if (users) {
    throw "Username/Email is already in use";
  }
  
  body["role"] = "USER";

  const createdUser = await userService.createUser(body);
  if (!createdUser) {
    throw "something went wrong";
  }

  let updatedUser = _.omit(createdUser.dataValues, ["password"]);
  console.log(updatedUser)
  return { ...updatedUser};
}

module.exports = {
  login,
  create_user
};

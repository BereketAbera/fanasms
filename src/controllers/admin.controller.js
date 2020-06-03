const userService = require("../services/users.service");

function login(req, res, next) {
  userService
    .addShortCode({
      code: "8181",
      defaultReply: "Welcome to 8181",
      defaultMessage: "Hello join 8181",
    })
    .then((sc) => res.status(200).send({ shortCode: sc }))
    .catch((err) => res.status(500).send({ message: err }));
}

module.exports = {
  login,
};

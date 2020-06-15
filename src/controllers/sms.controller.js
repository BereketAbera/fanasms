const smsService = require("../services/sms.service");
const moment = require("moment");

function incomingSms(req, res, next) {
  let queryParams = req.query;
  allSmsHandler(queryParams)
    .then((response) => {
      if (response.processed) {
        next();
      } else {
        res.status(400).send({ processed: false });
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send({ message: "server error" });
    });
}

async function allSmsHandler(message) {
  let smsAll = await smsService.addMessage({
    ...message,
    receivedDate: moment(message.date).format("YYYY-MM-DD HH:mm:ss"),
  });
  if (smsAll) {
    return { processed: true };
  }
  return { processed: false };
}

function userSms(req, res, next) {

  let queryParams = req.query;

  userSmsHandler(queryParams)
    .then((response) => {
      if (response.processed) {
        res.status(200).send({ processed: true });
      } else if (response.key) {
        req.key = response.key;
        req.msg = response.msg;
        next();
      } else {
        res.status(400).send({ processed: false });
      }
    })
    .catch((err) => res.status(500).send({ message: "server error" }));
}

async function userSmsHandler(message) {
  let { key, msg } = parseKey(message.message);
  let user = await smsService.getUserWithKey(key, message.shortCode);
  if (user) {
    let userSms = await smsService.addUserInbox({
      shortCode: message.shortCode,
      phoneNumber: message.phoneNumber,
      receivedDate: moment(message.date).format("YYYY-MM-DD HH:mm:ss"),
      uniqueKeyId: user.UniqueKeyId,
      message: msg,
    });
    
    // servers.checkApp("hellos");
    
    if (userSms) {
      return { processed: true };
    }
  } else {
    return { processed: false, key, msg };
  }
}

function voteSms(req, res, next) {
  let queryParams = req.query;
  voteSmsHandler(queryParams, req.key, req.msg)
    .then((response) => {
      if (response.processed) {
        res.status(200).send({ processed: true });
      } else {
        res.status(400).send({ ...response });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "server error" });
    });
}

async function voteSmsHandler(message, key, msg) {
  let voteOption = await smsService.getVoteOptionWithKey(
    key,
    message.shortCode
  );
  if (voteOption) {
    // let prevVote = await smsService.getVote(
    //   voteOption.UniqueKeyId,
    //   message.phoneNumber
    // );

    let voteSms = await smsService.addVoteInbox({
      shortCode: message.shortCode,
      phoneNumber: message.phoneNumber,
      receivedDate: moment(message.date).format("YYYY-MM-DD HH:mm:ss"),
      uniqueKeyId: voteOption.UniqueKeyId,
      message: msg,
    });
    if (voteSms) {
      return { processed: true };
    }

  } else {
    let userInfo = await smsService.getUserInfoWithKey("INFO");
    await smsService.addUserInbox({
      shortCode: message.shortCode,
      phoneNumber: message.phoneNumber,
      receivedDate: moment(message.date).format("YYYY-MM-DD HH:mm:ss"),
      uniqueKeyId: userInfo.UniqueKeyId,
      message: msg,
    });
    return { processed: false, message: "Key not found." };
  }
}

function parseKey(message) {
  message = message.trim();
  let key = message.split(" ")[0].toUpperCase() || "";
  let msg = message.slice(key.length).trim();

  return { key, msg };
}

module.exports = {
  incomingSms,
  userSms,
  voteSms,
};

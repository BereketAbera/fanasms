const sequelize = require("../database/connection");

const Message = sequelize.import("./messages.js");
const ShortCode = sequelize.import("./shortCodes.js");
const UniqueKey = sequelize.import("./uniqueKeys.js");
const User = sequelize.import("./users.js");
const UsersInbox = sequelize.import("./usersInbox.js");
const VoteGroup = sequelize.import("./voteGroups.js");
const VoteOption = sequelize.import("./voteOptions.js");
const VotesInbox = sequelize.import("./votesInbox.js");

// User.belongsTo(UniqueKey);
// User.belongsTo(ShortCode);

ShortCode.hasMany(User);

VoteOption.belongsTo(UniqueKey);
VoteOption.belongsTo(VoteGroup);

VoteGroup.hasMany(VoteOption);

module.exports = {
  Message,
  ShortCode,
  UniqueKey,
  User,
  UsersInbox,
  VoteGroup,
  VotesInbox,
  VoteOption,
};

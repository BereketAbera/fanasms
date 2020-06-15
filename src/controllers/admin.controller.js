const userService = require("../services/users.service");
const adminService = require("../services/admin.service");
const { validateVoteGroup, validateCode } = require("../_helpers/validator");
const _ = require("lodash");
function create_code(req, res, next) {
  const valid = validateCode(req.body);
  if (valid != true) {
    res.status(422).json({ message: valid });
    return;
  }
  createCodeHandler(req.body)
    .then(code => res.status(200).send({ shortCode: code }))
    .catch(err => res.status(500).send({ message: err }));
}

async function createCodeHandler(body) {
  const checkExit = await adminService.getCodebyName(body.code);
  if (checkExit) {
    throw "Code already exists";
  }
  const code = adminService.addShortCode(body);
  if (code) {
    return code;
  }
}

function create_key(req, res, next) {
  createKeyHandler(req.body)
    .then(code => res.status(200).send({ key: code }))
    .catch(err => res.status(500).send({ message: err }));
}

async function createKeyHandler(body) {
  const code = adminService.addKey(body);
  if (code) {
    return code;
  }
}

function createVoteGroup(req, res, next) {
  const valid = validateVoteGroup(req.body);
  if (valid != true) {
    res.status(422).json({ message: valid });
    return;
  }
  createVoteGroupHandler(req.body)
    .then(resp => res.status(200).send({ voteGroup: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function createVoteGroupHandler(body) {
  const shortcode = await adminService.getCodebyName(body.code);
  if (!shortcode) {
    throw "no code exit with name";
  }

  body["ShortCodeId"] = shortcode.id;
  body['status'] = 2;
  const createVoteGroup = await adminService.createVoteGroup(body);
  if (!createVoteGroup) {
    throw "Not created! try again";
  }
  return createVoteGroup;
}

function createVoteOption(req, res, next) {
  createVoteOptionHandler(req.body)
    .then(resp => res.status(200).send({ vote: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

function createVoteOptions(req, res, next) {
  createVoteOptionsHandler(req.body)
    .then(resp => res.status(200).send({ vote: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function checkVoteOptions(data) {
  const check = await Promise.all(
    data.map(async (item, index) => {
      const key = await adminService.getKeyByKeyname(item.key);
      const shortcode = await adminService.getCodebyName(item.code);
      let error;
      if (key || !shortcode) {
        error = { index: index, msg: "Key already exists" };
      }
      const voteGroup = await adminService.getVoteGroupbyId(item.VoteGroupId);
      if (!voteGroup) {
        error = { msg: "Group id doesnt't exist" };
      }
      if (error) {
        return { success: false, error };
      } else {
        return { success: true, data: item };
      }
    })
  );
  return check;
}

async function createVoteOptionsHandler(body) {
  var erros = [];
  var result = await checkVoteOptions(body.voteOption);
  var found = false;
  for (var i = 0; i < result.length; i++) {
    if (result[i].success == false) {
      found = true;
      break;
    }
  }
  if (found) {
    return result;
  }
  const ress = await Promise.all(
    result.map(async item => {
      if (item.success) {
        const createKey = await adminService.addKey({
          key: item.data.key,
          type: "VOTE"
        });
        item.data["UniqueKeyId"] = createKey.id;
        const createVote = await adminService.createVoteOption(item.data);
        if (!createVote) {
          return { success: false, error: "Not created! try again" };
        }
        return { success: true, createVote };
      } else {
        return item;
      }
    })
  );
  return ress;
}

async function createVoteOptionHandler(body) {
  const key = await adminService.getKeyByKeyname(body.key);
  const shortcode = await adminService.getCodebyName(body.code);
  if (key || !shortcode) {
    throw "Key already exist/ no code exit with name";
  }

  const voteGroup = await adminService.getVoteGroupbyId(body.VoteGroupId);
  if (!voteGroup) {
    throw "Not Group doesnt exist";
  }
  const createKey = await adminService.addKey({ key: body.key, type: "VOTE" });

  body["UniqueKeyId"] = createKey.id;
  body["VoteGroupId"] = voteGroup.id;
  const createVote = await adminService.createVoteOption(body);
  if (!createVote) {
    throw "Not created! try again";
  }
  return createVote;
}

function getGroupOption(req, res, next) {
  const { page, pageSize, sortDirection, sortActive } = req.query;
  // console.log(page,pageSize)
  getVoteGroupAll(
    page || 0,
    pageSize || 8,
    sortDirection || "DESC",
    sortActive || "createdAt"
  )
    .then(resp => res.status(200).send({ vote: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function getVoteGroupAll(page, pageSize, sortDirection, sortActive) {
  const pager = {
    pageSize: parseInt(pageSize),
    totalItems: 0,
    totalPages: 0,
    currentPage: parseInt(page)
  };
  const offset = page * pager.pageSize;
  const limit = pager.pageSize;
  const votegroups = await adminService.getAllVoteGroups(
    offset,
    limit,
    sortDirection,
    sortActive
  );
  if (!votegroups) {
    throw "Failed Fetch from API";
  }
  return votegroups;
}

function getVoteOption(req, res, next) {
  getVoteOptionByVoteGroupId(req.params.id)
    .then(resp => res.status(200).send({ vote: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function getVoteOptionByVoteGroupId(id) {
  const voteOption = await adminService.getVoteOptionByVoteGroupId(id);
  if (!voteOption) {
    throw "No VoteOption Found";
  }
  return voteOption;
}

function getShortCode(req, res, next) {
  getAllShortCodes()
    .then(resp => res.status(200).send({ code: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

function getShortCodeWithPagination(req, res, next) {
  const { page, pageSize } = req.query;
  getAllShortCodePagination(page || 1, pageSize || 8)
    .then(resp => res.status(200).send({ code: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function getAllShortCodes() {
  const shortcode = await adminService.getAllShortCodes();
  if (!shortcode) {
    throw "Unable to fetch shortcodes";
  }
  return shortcode;
}

async function getAllShortCodePagination(page, pageSize) {
  const pager = {
    pageSize: parseInt(pageSize),
    totalItems: 0,
    totalPages: 0,
    currentPage: parseInt(page)
  };
  const offset = page * pager.pageSize;
  const limit = pager.pageSize;

  const shortcode = await adminService.getAllShortCodesWithOffset(
    offset,
    limit
  );
  if (!shortcode) {
    throw "Unable to fetch shortcodes";
  }
  return shortcode;
}

function getAllMessage(req, res, next) {
  const { page, pageSize, date, message, phoneNumber } = req.query;
  getAllMessageHandler(
    page || 0,
    pageSize || 8,
    date || "",
    message || "",
    phoneNumber || ""
  )
    .then(resp => res.status(200).send({ message: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function getAllMessageHandler(page, pageSize, date, msg, phoneNumber) {
  const offset = parseInt(page) * parseInt(pageSize);
  const limit = parseInt(pageSize);
  const message = await adminService.getAllMessages(
    offset,
    limit,
    date,
    msg,
    phoneNumber
  );
  if (!message) {
    throw "unable to fetch messages";
  }
  return message;
}

function getUserMessage(req, res, next) {
  // console.log(req)
  const { page, pageSize, date, message, phoneNumber } = req.query;

  getUserMessageHandler(
    req.user.id,
    page || 0,
    pageSize || 8,
    date || "",
    message || "",
    phoneNumber || ""
  )
    .then(resp => res.status(200).send({ message: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function getUserMessageHandler(
  id,
  page,
  pageSize,
  date,
  msg,
  phoneNumber
) {
  const offset = parseInt(page) * parseInt(pageSize);
  const limit = parseInt(pageSize);
  // console.log(date);
  const user = await userService.getUserById(id);
  if (!user) {
    throw "User doens't exist";
  }
  // const message = await adminService.getUserMessages(user.UniqueKeyId,offset,limit,date,msg,phoneNumber);
  const message2 = await adminService.getUserMessages2(
    user.UniqueKeyId,
    offset,
    limit,
    date,
    msg,
    phoneNumber
  );

  if (!message2) {
    throw "unable to fetch messages";
  }
  return message2;
}

function changeVoteGroupStatus(req, res, next) {
  changeVoteGroupStatusHandler(req.body)
    .then(resp => res.status(200).send({ votegroup: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function changeVoteGroupStatusHandler(body) {
  /**
   * Vote Group Status
   * 0 - closed
   * 1 - active
   * 2 - pending
   */
  // console.log(body)
  const votegroup = await adminService.getVoteGroupbyId(body.id);
  if (!votegroup) {
    throw "No voteGroup exist by this id";
  }
  body.status >= 0? body.status:0;
  const updateVote = await adminService.updateVoteGroup(votegroup,{status:body.status})
  const votes = await adminService.getVoteOptionByVoteGroupId(body.id);
  votes.map(async (item) => {
    const updatevote = adminService.updateVoteOptionStatus(item);
    if (updatevote) {
      return updatevote;
    } else { return false }
  })
  if (votes) {
    return { votegroup, vote: votes };
  }
}



function editVoteGroup(req, res, next) {
  const valid = validateVoteGroup(req.body);
  if (valid != true) {
    res.status(422).json({ message: valid });
    return;
  }
  editVoteGroupHandler(req.body)
    .then(resp => res.status(200).send({ votegroup: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function editVoteGroupHandler(body) {
  const votegroup = await adminService.getVoteGroupbyId(body.id);
  if (!votegroup) {
    throw "No voteGroup exist by this id";
  }
  const shortcode = await adminService.getCodebyName(body.code);
  if (!shortcode) {
    throw "no code exit with name";
  }

  body["ShortCodeId"] = shortcode.id;
  const updatevote = await adminService.updateVoteGroup(votegroup, body);
  if (!updatevote) {
    throw "Unable to update";
  }
  return updatevote;

}


function editVoteOption(req, res, next) {
  editVoteOptionHandler(req.body)
    .then(resp => res.status(200).send({ voteoption: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function editVoteOptionHandler(body) {
  const voteoptions = await adminService.getVoteOptionById(body.id);
  if (!voteoptions) {
    throw "No voteoption exist by this id";
  }
  
  
  const key = await adminService.getKeyByKeyname(body.key);
  
  if (key && key.id != voteoptions.UniqueKeyId) {
    throw "Key already exist";
  }

  updatevote= await adminService.editVoteOption(voteoptions,body);
  if (!updatevote) {
    throw "Unable to update";
  }
  return updatevote;
}

function deleteVoteOption(req, res, next) {
  deleteVoteOptionHandler(req.params.id)
    .then(resp => res.status(200).send({ voteoption: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function deleteVoteOptionHandler(id){
  const voteOption = await adminService.getVoteOptionById(id);
  if(!voteOption){
    throw "No VoteOption exist with id"
  }
  // console.log(voteOption)
  const vote = await adminService.destroyVoteOption(id);
  const vKey = await adminService.destroyKey(voteOption.UniqueKeyId);
  if(!vote && !vKey){
    throw "Fail to Delete"
  }
  return vote;
}


function editShortCode(req, res, next) {
 
  editShortCodeHandler(req.body)
    .then(resp => res.status(200).send({ message: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function editShortCodeHandler(body) {
  const shortcode = await adminService.getShortCodeById(body.id);
  if (!shortcode) {
    throw "Not short code exist by this id";
  }
  if(body.defaultReply){
    const updatecode = await adminService.updateShortCode(shortcode, body.defaultReply);
    if (updatecode) {
      return updatecode;
    }
    throw "Unable to update";
  }

  return "Already Updated"
  
}

function getVoteGroupDetails(req, res, next) {
  getvoteGroupDetailHandler(req.params.id)
    .then(resp => res.status(200).send({ vote: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function getvoteGroupDetailHandler(id) {
  const votegroup = await adminService.getVoteGroupbyId(id);
  if (!votegroup) {
    throw "No VoteGroup Found with Id";
  }
  const votes = await adminService.getVoteOptionByVoteGroupId(id);

  if (votes) {
    return { votegroup, voteOption: votes };
  }
  return { votegroup, voteOption: [] };
}

function liveGetUserMessage(req, res, next) {
  liveMessageHandler(req.params.id)
    .then(resp => res.status(200).send({ vote: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function liveMessageHandler(){
 
}

module.exports = {
  create_code,
  create_key,
  createVoteGroup,
  createVoteOption,
  createVoteOptions,
  getGroupOption,
  getShortCode,
  getShortCodeWithPagination,
  getVoteOption,
  getAllMessage,
  getUserMessage,
  liveGetUserMessage,
  editShortCode,
  editVoteGroup,
  editVoteOption,
  deleteVoteOption,
  changeVoteGroupStatus,
  getVoteGroupDetails
};

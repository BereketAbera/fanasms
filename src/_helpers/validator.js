const validator = require("validator");

const _ = require("lodash");

function validateAccount(data) {
    const errors = {};
    let valid = true;
    const fields = [
        "username",
        "password",
    ];
    const keys = _.keys(data);
    fields.map(field => {
        if (keys.includes(field)) {
            return;
        }
        valid = false;
    });
    if (!valid) {
        return "Password and username incorrect";
    }
    _.map(data, (value, key) => {

        if (validator.isEmpty(value + "")) {
            errors[key] = `${key} is required`;
        }

    });

    if (valid) {
        return valid;
    }

    return errors;
}

function validateUser(data) {
    const errors = {};
    let valid = true;
    const fields = [
        "email",
        "username",
        "password",
        "fullName",
        "code",
        "key",
    ];
    const keys = _.keys(data);
    fields.map(field => {
        if (keys.includes(field)) {
            return;
        }
        valid = false;
    });
    if (!valid) {
        return "some required fields are not present";
    }
    _.map(data, (value, key) => {
        if (key == "email") {
            if (!validator.isEmail(value + "")) {
                errors[key] = "email is not valid";
                valid = false;
            }
        } else {
            if (validator.isEmpty(value + "")) {
                errors[key] = `${key} is required`;
            }
        }
    });

    if (valid) {
        return valid;
    }

    return errors;
}


function validateCode(data) {
    // console.log(data)
    const errors = {};
    let valid = true;
    const fields = [
        "code",
        "defaultReply",
    ];
    const keys = _.keys(data);
    fields.map(field => {
        if (keys.includes(field)) {
            return;
        }
        valid = false;
    });
    if (!valid) {
        return "some required fields are not present";;
    }
    _.map(data, (value, key) => {
      
        if (key == "code") {
            if (!validator.isNumeric(value + "")) {
                errors[key] = `${key} should be a number`;
                valid=false;
            }
            
            if (!validator.isInt(value+"",{min:1000,max:9999})) {
                errors[key] = `${key} should be a 4 digit number`;
                valid=false;
            }
        } else {
            if (validator.isEmpty(value + "")) {
                errors[key] = `${key} is required`;
                valid=false;
            }
        }
    });

    if (valid) {
        return valid;
    }

    return errors;
}

module.exports = {
    validateAccount,
    validateUser,
    validateCode
};
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

module.exports = {
    validateAccount,
    validateUser
};
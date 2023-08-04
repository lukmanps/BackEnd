"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignup = void 0;
const userAuthHelper_1 = require("../../helper/auth/userAuthHelper");
const userSignup = (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            password: req.body.password
        };
        (0, userAuthHelper_1.doRegister)(userData)
            .then((response) => {
            console.log(response, ": Response from User Registration");
            res.json(response);
        })
            .catch((err) => {
            console.log(err, ": Error from User Registration");
        });
    }
    catch (err) {
        console.log(err, ' : ERROR in userSignup');
    }
};
exports.userSignup = userSignup;
const userLogin = (req, res) => {
    const userData = req.body;
    console.log(userData, " user data");
    (0, userAuthHelper_1.doLogin)(userData)
        .then((response) => {
        console.log(response, " :: Response from doLogin");
        res.status(200).json(response);
    })
        .catch((err) => {
        console.log(err, ': ERROR in userLogin');
    });
};
exports.userLogin = userLogin;
exports.default = {
    userSignup: exports.userSignup,
    userLogin: exports.userLogin
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithGoogle = exports.userLogin = exports.userSignup = void 0;
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
const signInWithGoogle = (req, res) => {
    var _a, _b, _c;
    const userData = {
        username: (_a = req.body) === null || _a === void 0 ? void 0 : _a.displayName,
        email: (_b = req.body) === null || _b === void 0 ? void 0 : _b.email,
        profilePicture: (_c = req.body) === null || _c === void 0 ? void 0 : _c.photoURL
    };
    (0, userAuthHelper_1.doSignInWithGoogle)(userData)
        .then((response) => {
        console.log(response, " ::resposne");
        res.status(200).json(response);
    })
        .catch((err) => {
        console.log(err, 'ERROR in signInWithGoogle');
    });
};
exports.signInWithGoogle = signInWithGoogle;
exports.default = {
    userSignup: exports.userSignup,
    userLogin: exports.userLogin,
    signInWithGoogle: exports.signInWithGoogle
};

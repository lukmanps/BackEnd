"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const adminAuthHelper_1 = require("../../helper/auth/adminAuthHelper");
const adminLogin = (req, res) => {
    try {
        const adminData = req.body;
        (0, adminAuthHelper_1.adminDoLogin)(adminData)
            .then((response) => {
            res.json(response);
        }).catch((err) => {
            console.log(err, ' :ERROR in adminLogin');
        });
    }
    catch (err) {
        console.log(err, ' :ERROR in adminLogin');
    }
};
exports.adminLogin = adminLogin;
exports.default = {
    adminLogin: exports.adminLogin
};

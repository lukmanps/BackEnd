"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.userData = exports.changeUserStatus = exports.customersList = void 0;
const adminHelper_1 = require("../../helper/admin/adminHelper");
const customersList = (req, res) => {
    (0, adminHelper_1.getAllCustomers)()
        .then((response) => {
        console.log(response, " : Customers List");
        res.json(response);
    })
        .catch((err) => {
        console.log(err, " : Error in customers List");
    });
};
exports.customersList = customersList;
const changeUserStatus = (req, res) => {
    const userId = req.query.id;
    (0, adminHelper_1.setUserStatus)(userId)
        .then(() => {
        res.json({ status: true });
    })
        .catch(() => {
        res.json({ status: false });
    });
};
exports.changeUserStatus = changeUserStatus;
const userData = (req, res) => {
    let userId = req.query.id;
    (0, adminHelper_1.getUserData)(userId)
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err, " : ERROR in userData");
    });
};
exports.userData = userData;
const deleteUser = (req, res) => {
    let userId = req.query.id;
    (0, adminHelper_1.deleteUserData)(userId)
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err, " : ERROR in deleteUser");
    });
};
exports.deleteUser = deleteUser;
exports.default = {
    customersList: exports.customersList,
    changeUserStatus: exports.changeUserStatus,
    userData: exports.userData,
    deleteUser: exports.deleteUser
};

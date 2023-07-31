"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePayment = void 0;
const userModel_1 = require("../../model/userModel");
const updatePayment = (id, amount) => {
    return new Promise((resolve, reject) => {
        userModel_1.userCollection.findByIdAndUpdate(id, { wallet: amount })
            .then((response) => {
            resolve({ status: true });
        })
            .catch((err) => {
            console.log(err, " : ERROR in update Payment");
            reject({ status: false });
        });
    });
};
exports.updatePayment = updatePayment;
exports.default = {
    updatePayment: exports.updatePayment
};

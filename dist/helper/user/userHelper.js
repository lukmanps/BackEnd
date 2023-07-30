"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSellScrap = void 0;
const pickupModel_1 = require("../../model/pickupModel");
const doSellScrap = (data) => {
    return new Promise((resolve, reject) => {
        const myDate = new Date();
        const year = myDate.getFullYear();
        const month = String(myDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(myDate.getDate()).padStart(2, '0');
        const date = `${day}-${month}-${year}`;
        const newData = Object.assign(Object.assign({}, data), { date });
        console.log(newData, " NEW DATA b4 upload into DB");
        pickupModel_1.pickupCollection.create(newData)
            .then((response) => {
            resolve({ response, status: true });
        })
            .catch((err) => {
            reject({ err, status: false });
        });
    });
};
exports.doSellScrap = doSellScrap;
exports.default = {
    doSellScrap: exports.doSellScrap
};

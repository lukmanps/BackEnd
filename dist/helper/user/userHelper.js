"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSellScrap = void 0;
const pickupModel_1 = require("../../model/pickupModel");
const doSellScrap = (data) => {
    return new Promise((resolve, reject) => {
        const date = new Date();
        pickupModel_1.pickupCollection.create(data)
            .then((response) => {
            console.log(response, " : Response after adding data");
        })
            .catch((err) => {
            console.log(err, " : ERROR In doSellScrap");
        });
    });
};
exports.doSellScrap = doSellScrap;
exports.default = {
    doSellScrap: exports.doSellScrap
};

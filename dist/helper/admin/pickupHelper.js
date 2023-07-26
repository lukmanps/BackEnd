"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPickups = void 0;
const pickupModel_1 = require("../../model/pickupModel");
const getAllPickups = () => {
    return new Promise((resolve, reject) => {
        pickupModel_1.pickupCollection.find({})
            .then((response) => {
            resolve(response);
        })
            .catch((err) => {
            reject(err);
        });
    });
};
exports.getAllPickups = getAllPickups;
exports.default = {
    getAllPickups: exports.getAllPickups
};

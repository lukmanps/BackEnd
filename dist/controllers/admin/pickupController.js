"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickupsList = void 0;
const pickupHelper_1 = require("../../helper/admin/pickupHelper");
const pickupsList = (req, res) => {
    (0, pickupHelper_1.getAllPickups)()
        .then((response) => {
        console.log(response);
        res.json(response);
    })
        .catch((err) => {
        console.log(err, "ERROR in pickupsList");
    });
};
exports.pickupsList = pickupsList;
exports.default = {
    pickupsList: exports.pickupsList
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePickupStatus = exports.selectedScraps = exports.pickupDetails = exports.pickupsList = void 0;
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
const pickupDetails = (req, res) => {
    const id = req.query.id;
    (0, pickupHelper_1.getPickupDetails)(id)
        .then((responses) => {
        responses.map((response) => {
            res.json(response);
        });
    })
        .catch((err) => {
        console.log(err, " : ERROR in pickupDetais");
    });
};
exports.pickupDetails = pickupDetails;
const selectedScraps = (req, res) => {
    const id = req.query.id;
    (0, pickupHelper_1.getSelectedScrap)(id)
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err, " : ERROR in pickupDetais");
    });
};
exports.selectedScraps = selectedScraps;
const changePickupStatus = (req, res) => {
    const id = req.query.id;
    (0, pickupHelper_1.updatePickupStatus)(id, req.body.value)
        .then((response) => {
        res.status(200).json({ status: true });
    })
        .catch(() => {
        res.status(401).json({ status: false });
    });
};
exports.changePickupStatus = changePickupStatus;
exports.default = {
    pickupsList: exports.pickupsList,
    pickupDetails: exports.pickupDetails,
    changePickupStatus: exports.changePickupStatus
};

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
    console.log(id, " : ID from rquest");
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
    console.log(" Selected Scraps called");
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
    console.log(req.body.value, id, " Value from FE");
    (0, pickupHelper_1.updatePickupStatus)(id, req.body.value)
        .then((response) => {
        console.log(true);
    })
        .catch(() => {
        console.log(false);
    });
};
exports.changePickupStatus = changePickupStatus;
exports.default = {
    pickupsList: exports.pickupsList,
    pickupDetails: exports.pickupDetails,
    changePickupStatus: exports.changePickupStatus
};

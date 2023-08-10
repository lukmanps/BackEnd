"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapList = exports.addScrapMaterial = void 0;
const scrapHelper_1 = require("../../helper/scrap/scrapHelper");
const addScrapMaterial = (req, res) => {
    const formData = req.body;
    (0, scrapHelper_1.addScrap)(formData)
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err, "ERROR in addScrapMaterial");
    });
};
exports.addScrapMaterial = addScrapMaterial;
const scrapList = (req, res) => {
    (0, scrapHelper_1.getAllScrap)()
        .then((response) => {
        res.json(response);
    })
        .catch((err) => [
        console.log(err, " : Error in scrapList")
    ]);
};
exports.scrapList = scrapList;
exports.default = {
    addScrap: scrapHelper_1.addScrap
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellScrap = void 0;
const userHelper_1 = require("../../helper/user/userHelper");
const sellScrap = (req, res) => {
    const data = req.body;
    (0, userHelper_1.doSellScrap)(data)
        .then((response) => {
        res.json(response.status);
    })
        .catch((response) => {
        res.json(response.status);
    });
};
exports.sellScrap = sellScrap;
exports.default = {
    sellScrap: exports.sellScrap
};

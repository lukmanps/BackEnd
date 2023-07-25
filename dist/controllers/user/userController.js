"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellScrap = void 0;
const userHelper_1 = require("../../helper/user/userHelper");
const sellScrap = (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        (0, userHelper_1.doSellScrap)(data);
    }
    catch (err) {
        console.log(err);
    }
};
exports.sellScrap = sellScrap;
exports.default = {
    sellScrap: exports.sellScrap
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellScrap = void 0;
const userHelper_1 = require("../../helper/user/userHelper");
const sellScrap = (req, res) => {
    try {
        const data = req.body;
        console.log(data, " : Sell Scrap Data from Front End");
        (0, userHelper_1.doSellScrap)(data)
            .then((response) => {
            res.json(response.status);
        })
            .catch((response) => {
            res.json(response.status);
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.sellScrap = sellScrap;
exports.default = {
    sellScrap: exports.sellScrap
};

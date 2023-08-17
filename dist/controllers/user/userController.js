"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentPickups = exports.getReviews = exports.review = exports.sellScrap = void 0;
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
const review = (req, res) => {
    (0, userHelper_1.addReview)(req.body)
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        res.json(err.status);
    });
};
exports.review = review;
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield (0, userHelper_1.getAllReviews)();
        res.json(reviews);
    }
    catch (err) {
        console.log(err, " :: Error in getReviews");
    }
});
exports.getReviews = getReviews;
const recentPickups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.id;
        console.log(userId, " :: User Id");
        const pickups = yield (0, userHelper_1.getRecentPickups)(userId);
        res.status(200).json(pickups);
    }
    catch (err) {
        res.status(401);
        console.log(err, ":: Error in recentPickups");
    }
});
exports.recentPickups = recentPickups;
exports.default = {
    sellScrap: exports.sellScrap,
    review: exports.review
};

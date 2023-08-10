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
exports.dashboardInfo = exports.pickupCount = exports.customerCount = void 0;
const dashboardHelper_1 = require("../../helper/admin/dashboardHelper");
const customerCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerCount = yield (0, dashboardHelper_1.getCustomerCount)();
        res.json(customerCount);
    }
    catch (err) {
        console.log(err);
    }
});
exports.customerCount = customerCount;
const pickupCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pickupCount = yield (0, dashboardHelper_1.getPickupCount)();
        res.json(pickupCount);
    }
    catch (err) {
        console.log(err);
    }
});
exports.pickupCount = pickupCount;
const dashboardInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboardData = yield (0, dashboardHelper_1.getDashboardInfo)();
        res.json(dashboardData);
    }
    catch (err) {
        console.log(err);
    }
});
exports.dashboardInfo = dashboardInfo;
exports.default = {
    customerCount: exports.customerCount,
    pickupCount: exports.pickupCount
};

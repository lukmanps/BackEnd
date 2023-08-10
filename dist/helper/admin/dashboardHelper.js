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
exports.getDashboardInfo = exports.getPickupCount = exports.getCustomerCount = void 0;
const pickupModel_1 = require("../../model/pickupModel");
const userModel_1 = require("../../model/userModel");
const getCustomerCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield userModel_1.userCollection.countDocuments({});
        return count;
    }
    catch (err) {
        console.log(err, " :: Error in getCustomerCount");
    }
});
exports.getCustomerCount = getCustomerCount;
const getPickupCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield pickupModel_1.pickupCollection.countDocuments({});
        return count;
    }
    catch (err) {
        console.log(err, " :: Error in getPickupCount");
    }
});
exports.getPickupCount = getPickupCount;
const getDashboardInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pickupCount = yield pickupModel_1.pickupCollection.countDocuments({});
        const customerCount = yield userModel_1.userCollection.countDocuments({});
        return { pickupCount, customerCount };
    }
    catch (err) {
        console.log(err, ":: Error in getDashboardInfo");
    }
});
exports.getDashboardInfo = getDashboardInfo;
exports.default = {
    getCustomerCount: exports.getCustomerCount,
    getPickupCount: exports.getPickupCount
};

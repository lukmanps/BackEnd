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
exports.updatePayment = void 0;
const userModel_1 = require("../../model/userModel");
const updatePayment = (id, amount) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.userCollection.findById(id);
        let walletAmount = user === null || user === void 0 ? void 0 : user.wallet;
        userModel_1.userCollection.findByIdAndUpdate(id, { wallet: walletAmount + amount })
            .then((response) => {
            resolve({ status: true });
        })
            .catch((err) => {
            console.log(err, " : ERROR in update Payment");
            reject({ status: false });
        });
    }));
};
exports.updatePayment = updatePayment;
exports.default = {
    updatePayment: exports.updatePayment
};

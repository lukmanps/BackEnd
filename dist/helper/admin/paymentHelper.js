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
//To update the user's wallet after payment.
const updatePayment = (id, amount) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.userCollection.findById(id);
        if (!user) {
            return reject({ status: false, message: 'user not found' });
        }
        const walletAmount = user.wallet;
        const newWallet = walletAmount + amount;
        console.log(newWallet, ':: Update wallet amount ');
        yield userModel_1.userCollection.updateOne({ _id: id }, { $set: { wallet: newWallet } });
        resolve({ status: true });
    }));
};
exports.updatePayment = updatePayment;
exports.default = {
    updatePayment: exports.updatePayment
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorPay = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
require('dotenv').config();
exports.razorPay = new razorpay_1.default({
    key_id: process.env.RAZOR_PAY_ID || '',
    key_secret: process.env.RAZOR_PAY_SECRET_KEY || '',
});

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
exports.getKey = exports.paymentVerification = exports.payment = void 0;
const razorpay_1 = require("../../config/razorpay");
require('dotenv').config();
const paymentHelper_1 = require("../../helper/admin/paymentHelper");
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Take amount from Front end as Req.body.amount
        //Number(req.body.amount * 100)
        console.log(req.body);
        const amount = req.body.amount;
        console.log(amount, "PAYMENT Called");
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = yield razorpay_1.razorPay.orders.create(options);
        console.log(order, " : Order Received");
        res.status(200).json({
            success: true,
            order
        });
    }
    catch (err) {
        console.log(err, " : ERROR IN Payment ");
    }
});
exports.payment = payment;
const paymentVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amount = req.query.amount;
        const userId = req.query.userId;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        if (userId !== undefined && amount !== undefined) {
            (0, paymentHelper_1.updatePayment)(userId, amount)
                .then((response) => {
                console.log(response, " :: Response from db after payment");
                if (response.status === true) {
                    res.redirect(`http://localhost:3000/admin/payment-success?reference=${razorpay_payment_id}`);
                }
            })
                .catch((err) => {
                console.log(err, " :ERROR in paymentVerification");
            });
        }
        else {
            console.log("User ID is undefined");
            res.redirect('http://localhost:3000/payment-error');
        }
    }
    catch (err) {
        console.log(err, " : ERROR IN Payment ");
        res.redirect('http://localhost:3000/payment-error');
    }
});
exports.paymentVerification = paymentVerification;
const getKey = (req, res) => {
    try {
        console.log(process.env.RAZOR_PAY_ID, " KEY");
        res.status(200).json({ key: process.env.RAZOR_PAY_ID });
    }
    catch (err) {
        console.log(err, " getKey Error");
    }
};
exports.getKey = getKey;
exports.default = {
    payment: exports.payment,
    paymentVerification: exports.paymentVerification,
    getKey: exports.getKey
};

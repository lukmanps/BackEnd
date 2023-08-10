"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickupCollection = exports.pickupSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pickupSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    scrap: [{
            item: mongoose_1.Schema.Types.ObjectId,
            quantity: Number
        }],
    formData: {
        name: String,
        email: String,
        phoneNo: String,
        address1: String,
        address2: String,
        locality: String,
        pin: String,
    },
    timeSlot: {
        date: String,
        time: String
    },
    status: {
        type: String,
        default: 'Pending'
    },
    totalAmount: Number,
    paymentId: String
});
exports.pickupCollection = (0, mongoose_1.model)('pickup', exports.pickupSchema);

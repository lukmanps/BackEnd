"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickupCollection = exports.pickupSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pickupSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    scrap: [String],
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
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
});
exports.pickupCollection = (0, mongoose_1.model)('pickup', exports.pickupSchema);

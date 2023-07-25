"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickupCollection = exports.pickupSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pickupSchema = new mongoose_1.Schema({
    userId: String,
    scrap: [
        {
            type: String,
            required: true
        }
    ],
    formData: {
        type: Number,
        required: true
    },
    timeSchedule: String,
});
exports.pickupCollection = (0, mongoose_1.model)('scrap', exports.pickupSchema);

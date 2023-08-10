"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewCollection = exports.reviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.reviewSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.ObjectId,
        ref: 'user'
    },
    review: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});
exports.reviewCollection = (0, mongoose_1.model)('review', exports.reviewSchema);

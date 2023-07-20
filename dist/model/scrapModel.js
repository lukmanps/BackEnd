"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapCollection = exports.scrapSchema = void 0;
const mongoose_1 = require("mongoose");
exports.scrapSchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: true
    },
    scrap: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
exports.scrapCollection = (0, mongoose_1.model)('scrap', exports.scrapSchema);

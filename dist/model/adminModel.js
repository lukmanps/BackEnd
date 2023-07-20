"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCollection = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
exports.adminSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.adminCollection = (0, mongoose_1.model)('admin', exports.adminSchema);

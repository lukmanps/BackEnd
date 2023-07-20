"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    wallet: {
        type: Number,
        default: 0
    }
});
exports.userCollection = (0, mongoose_1.model)('user', exports.userSchema);

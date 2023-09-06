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
    phoneNo: String,
    password: String,
    signInWithGoogle: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    wallet: {
        type: Number,
        default: 0
    },
    profilePicture: String
});
exports.userCollection = (0, mongoose_1.model)('user', exports.userSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const verifyAdmin = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(token, " :: Token in middleware");
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request. Token not found!' });
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, admin) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized request. Invalid Token' });
            }
            // Admin is verified, you can attach admin data to the request if needed
            if (admin) {
                next();
            }
        });
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized request. Token Verification failed' });
    }
};
exports.verifyAdmin = verifyAdmin;

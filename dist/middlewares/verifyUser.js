"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const verifyUser = (req, res, next) => {
    var _a;
    console.log(" Verify User Middleware");
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Remove 'Bearer ' from the string
    console.log(token, "token in middleware");
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request. Token missing.' });
        }
        const verifiedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        if (!verifiedUser) {
            return res.status(401).json({ message: 'Unauthorized request. Invalid token.' });
        }
        // Attach the verified user to the request for use in subsequent middleware/routes
        // req.user = verifiedUser;
        next();
    }
    catch (error) {
        console.log(error, ' :: ERROR in the verifyUser middleware');
        return res.status(401).json({ message: 'Unauthorized request. Token verification failed.' });
    }
};
exports.verifyUser = verifyUser;

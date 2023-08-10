"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
require('dotenv').config();
const verifyUser = (req, res, next) => {
    var _a;
    console.log(" Verify User Middleware");
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Remove 'Bearer ' from the string
    console.log(token, "token in middleware");
    try {
        if (!token) {
            console.log('Message: Unauthorized request. Token missing.');
            return res.status(401).json({ message: 'Unauthorized request. Token missing.' });
        }
        const validUser = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                console.log(user, " :: USer Details in Middleware");
                const dbUser = yield userModel_1.userCollection.findById({ _id: user.id });
                if (dbUser.status === true) {
                    next();
                }
                else {
                    return res.status(401).json({ message: 'Unauthorized request. User is Blocked!.' });
                }
            }
            else {
                return res.status(401).json({ message: 'Unauthorized request. Please try again later!.' });
            }
        }));
        if (!validUser) {
            return res.status(401).json({ message: 'Unauthorized request. Please try again later!' });
        }
    }
    catch (error) {
        console.log(error, ' :: ERROR in the verifyUser middleware');
        return res.status(401).json({ message: 'Unauthorized request. Token verification failed.' });
    }
};
exports.verifyUser = verifyUser;

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
exports.adminDoLogin = void 0;
const adminModel_1 = require("../../model/adminModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
console.log(process.env.JWT_KEY, 'JWT secret key');
const JWT_KEY = 'ba15b0bb9a658c14b1fcf50dadde13d23a6753bc1085f7f6b60364a7c8428f93';
const adminDoLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data, ': Data in adminDoLogin');
        // Assuming adminCollection is a valid MongoDB collection instance
        let admin = yield adminModel_1.adminCollection.findOne({ email: data.email });
        if (admin) {
            if (admin.password === data.password) {
                let adminInfo = {
                    id: admin._id,
                    email: admin.email,
                    username: admin.username,
                    admin: true,
                };
                // Use a hashed JWT secret from process.env.JWT_key
                let adminAccessToken = yield jsonwebtoken_1.default.sign(adminInfo, JWT_KEY, { expiresIn: '1d' });
                return { status: true, adminInfo, adminAccessToken };
            }
            else {
                return { status: false, message: 'Incorrect Password' };
            }
        }
        else {
            return { status: false, message: 'Admin does not exist' };
        }
    }
    catch (err) {
        console.error(err, ': ERROR in adminDoLogin');
        throw err; // Rethrow the error for higher-level error handling
    }
});
exports.adminDoLogin = adminDoLogin;
exports.default = {
    adminDoLogin: exports.adminDoLogin
};

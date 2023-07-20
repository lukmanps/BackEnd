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
const adminDoLogin = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(data, ': Data in adminDOLoING');
            let admin = yield adminModel_1.adminCollection.findOne({ email: data.email });
            if (admin) {
                if (admin.password === data.password) {
                    let adminInfo = {
                        email: admin.email,
                        username: admin.username
                    };
                    let adminAccessToken = jsonwebtoken_1.default.sign(adminInfo, process.env.JWT_key, { expiresIn: '1d' });
                    resolve({ adminInfo, adminAccessToken });
                }
                else {
                    let message = 'Incorrect Password';
                    resolve({ status: false, message });
                }
            }
            else {
                let message = 'Admin do not exists';
                resolve({ status: false, message });
            }
        }
        catch (err) {
            console.log(err, ": ERROR in adminDoLogin");
            reject(err);
        }
    }));
};
exports.adminDoLogin = adminDoLogin;
exports.default = {
    adminDoLogin: exports.adminDoLogin
};

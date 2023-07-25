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
exports.doLogin = exports.doRegister = void 0;
const userModel_1 = require("../../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//User Registration
const doRegister = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let user = yield userModel_1.userCollection.findOne({ email: data.email });
        if (!user) {
            data.password = yield bcrypt_1.default.hash(data.password, 10);
            userModel_1.userCollection.create(data).then((newUser) => {
                let userData = {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    phoneNo: newUser.phoneNo,
                    status: newUser.status
                };
                //JWT Authentication
                const accessToken = jsonwebtoken_1.default.sign(userData, process.env.JWT_KEY, { expiresIn: '1d' });
                resolve({ userData, accessToken });
            }).catch((err) => {
                reject(err);
                console.log(err, " :Error from Database ");
            });
        }
        else {
            console.log('User Already Exists');
            let message = 'User Already Exists';
            resolve({ status: false, message });
        }
    }));
};
exports.doRegister = doRegister;
//User Login
const doLogin = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let user = yield userModel_1.userCollection.findOne({ email: data.email });
            if (user) {
                if (user.status) {
                    const verifyPassword = yield bcrypt_1.default.compare(data.password, user.password);
                    console.log(verifyPassword, ': verify Password status');
                    if (verifyPassword) {
                        let userData = {
                            id: user._id,
                            email: user.email,
                            username: user.username,
                            phoneNo: user.phoneNo,
                            status: user.status
                        };
                        const accessToken = jsonwebtoken_1.default.sign(userData, process.env.JWT_KEY, { expiresIn: '1d' });
                        resolve({ userData, accessToken });
                    }
                    else {
                        let message = 'Incorrect Password';
                        resolve({ status: false, message });
                    }
                }
                else {
                    let message = 'User is blocked';
                    resolve({ status: false, message });
                }
            }
            else {
                let message = 'User not found';
                resolve({ status: false, message });
            }
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    }));
};
exports.doLogin = doLogin;
exports.default = {
    doRegister: exports.doRegister,
    doLogin: exports.doLogin
};

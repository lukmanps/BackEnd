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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserData = exports.getUserData = exports.setUserStatus = exports.getAllCustomers = void 0;
const userModel_1 = require("../../model/userModel");
const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        userModel_1.userCollection.find({})
            .then((response) => {
            console.log(response);
            resolve(response);
        })
            .catch((err) => {
            console.log(err, " :Error In getAllCustomers");
        });
    });
};
exports.getAllCustomers = getAllCustomers;
const setUserStatus = (userId) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let user = yield userModel_1.userCollection.findById(userId);
            if (user) {
                user.status = !user.status;
                user.save();
                resolve();
            }
            else {
                console.log('NO user Found!');
                reject({ status: false });
            }
        }
        catch (err) {
            console.log(err, " : ERROR in setUserStatus");
        }
    }));
};
exports.setUserStatus = setUserStatus;
const getUserData = (userId) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let user = yield userModel_1.userCollection.findById(userId);
            if (user) {
                resolve(user);
            }
            else {
                reject();
            }
        }
        catch (err) {
            console.log(err, " : ERROR in getUserData");
        }
    }));
};
exports.getUserData = getUserData;
const deleteUserData = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            userModel_1.userCollection.deleteOne({ _id: userId })
                .then(() => {
                resolve({ status: true });
            })
                .catch((err) => {
                console.log(err, ' :ERROR WHILE DELETING USER');
                reject({ status: false });
            });
        }
        catch (err) {
            console.log(err, ' : ERROR in deleteUserData');
        }
    });
};
exports.deleteUserData = deleteUserData;
exports.default = {
    getAllCustomers: exports.getAllCustomers,
    setUserStatus: exports.setUserStatus,
    getUserData: exports.getUserData,
    deleteUserData: exports.deleteUserData
};

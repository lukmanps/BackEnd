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
exports.getAllScrap = exports.addScrap = void 0;
const scrapModel_1 = require("../../model/scrapModel");
const addScrap = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let scrap = yield scrapModel_1.scrapCollection.findOne({ scrap: data.scrap });
            if (!scrap) {
                scrapModel_1.scrapCollection.create(data)
                    .then((response) => {
                    resolve(response);
                    console.log(response, ': RESPONSE FROM DATABASE');
                })
                    .catch((err) => {
                    reject(err);
                    console.log(err, " :ERROR from Database");
                });
            }
            else {
                const message = 'Scrap already added';
                resolve({ status: false, message });
            }
        }
        catch (err) {
            console.log(err, 'Errror in add scrap');
        }
    }));
};
exports.addScrap = addScrap;
const getAllScrap = () => {
    return new Promise((resolve, reject) => {
        scrapModel_1.scrapCollection.find({})
            .then((response) => {
            resolve(response);
        })
            .catch((err) => {
            console.log(err, 'Error in getAllScrap');
        });
    });
};
exports.getAllScrap = getAllScrap;
exports.default = {
    addScrap: exports.addScrap
};

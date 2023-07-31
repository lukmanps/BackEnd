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
exports.updatePickupStatus = exports.getSelectedScrap = exports.getPickupDetails = exports.getAllPickups = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pickupModel_1 = require("../../model/pickupModel");
const getAllPickups = () => {
    return new Promise((resolve, reject) => {
        pickupModel_1.pickupCollection.aggregate([
            {
                $project: {
                    'date': 1,
                    'formData.name': 1,
                    'status': 1,
                    'formData.locality': 1
                }
            }
        ])
            .then((response) => {
            resolve(response);
        })
            .catch((err) => {
            console.log(err, " : Error in getAllPickups");
        });
    });
};
exports.getAllPickups = getAllPickups;
const getPickupDetails = (id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield pickupModel_1.pickupCollection.findById(id);
            const result = yield pickupModel_1.pickupCollection.aggregate([
                {
                    $project: {
                        '_id': 1,
                        'user': 1,
                        'date': 1,
                        'formData': 1,
                        'timeSlot': 1,
                        'status': 1,
                    }
                },
            ]);
            resolve(result);
        }
        catch (err) {
            console.log(err, ": ERROR in getPickupDetails");
        }
    }));
};
exports.getPickupDetails = getPickupDetails;
const getSelectedScrap = (id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield pickupModel_1.pickupCollection.findById(id);
            const result = yield pickupModel_1.pickupCollection.aggregate([
                {
                    $match: { _id: new mongoose_1.default.Types.ObjectId(id) },
                },
                {
                    $unwind: '$scrap'
                },
                {
                    $project: {
                        item: '$scrap.item',
                        qty: '$scrap.quantity'
                    }
                },
                {
                    $lookup: {
                        from: 'scraps',
                        localField: 'item',
                        foreignField: '_id',
                        as: 'scrap',
                    },
                },
                {
                    $project: {
                        'qty': 1,
                        'scrap': { $arrayElemAt: ['$scrap', 0] }
                    }
                },
            ]);
            resolve(result);
        }
        catch (err) {
            console.log(err, ": ERROR in getPickupDetails");
        }
    }));
};
exports.getSelectedScrap = getSelectedScrap;
const updatePickupStatus = (id, value) => {
    return new Promise((resolve, reject) => {
        pickupModel_1.pickupCollection.findByIdAndUpdate(id, { status: value })
            .then((response) => {
            console.log(response, " : response from DB");
            resolve(response);
        })
            .catch((err) => {
            console.log(err, " : error from DB");
        });
    });
};
exports.updatePickupStatus = updatePickupStatus;
exports.default = {
    getAllPickups: exports.getAllPickups,
    getPickupDetails: exports.getPickupDetails,
    getSelectedScrap: exports.getSelectedScrap,
    updatePickupStatus: exports.updatePickupStatus
};

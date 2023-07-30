import { response } from "express";
import mongoose from "mongoose";
import { pickupCollection } from "../../model/pickupModel"


export const getAllPickups = () => {
    return new Promise((resolve, reject) => {
        pickupCollection.aggregate([
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
            })
    })
}

export const getPickupDetails = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await pickupCollection.findById(id);

            const result: any = await pickupCollection.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(id) },
                },
                {
                    $unwind: '$scrap'
                },
                {
                    $project: {
                        date: '$date',
                        formData: '$formData',
                        timeSlot: '$timeSlot',
                        status: '$status',
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
                        'date': 1,
                        'formData': 1,
                        'timeSlot': 1,
                        'status': 1,
                        'qty': 1,
                        'scrap': { $arrayElemAt: ['$scrap', 0] }
                    }
                },
            ])
            resolve(result);
        }
        catch (err) {
            console.log(err, ": ERROR in getPickupDetails");
        }

    })
}

export const updatePickupStatus = (id: string, value: string) => {
    return new Promise((resolve, reject) => {
        pickupCollection.findByIdAndUpdate(id, { status: value })
            .then((response) => {
                console.log(response, " : response from DB");
                resolve(response);
            })
            .catch((err) => {
                console.log(err, " : error from DB");
            })
    })
}

export default {
    getAllPickups,
    getPickupDetails,
    updatePickupStatus
}
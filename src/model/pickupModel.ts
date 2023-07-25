import mongoose, {Schema, model} from "mongoose";

export const pickupSchema = new Schema({

    userId: String,

    scrap: [
        {
            type: String,
            required: true
        }
    ],

    formData: {
        type: Number,
        required: true
    },

    timeSchedule: String,
})

export const pickupCollection = model('scrap', pickupSchema);
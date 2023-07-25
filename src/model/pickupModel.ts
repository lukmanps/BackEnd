import { Schema, model } from "mongoose";

export const pickupSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    scrap: [String],
    formData: {
        name: String,
        email: String,
        phoneNo: String,
        address1: String,
        address2: String,
        locality: String,
        pin: String,
    },
    timeSlot: {
        type: String,
        required: true
    },
})

export const pickupCollection = model('pickup', pickupSchema);
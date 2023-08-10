import { Schema, model } from "mongoose";

export const pickupSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    scrap: [{
        item: Schema.Types.ObjectId,
        quantity: Number
    }],
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
        date: String,
        time: String
    },
    status: {
        type: String,
        default: 'Pending'
    }
})

export const pickupCollection = model('pickup', pickupSchema);
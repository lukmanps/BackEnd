import mongoose, {Schema, model} from "mongoose";

export const scrapSchema = new Schema({

    category: {
        type: String,
        required: true
    },

    scrap: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    totalQty: {
        type: Number,
        default: 0
    }
})

export const scrapCollection = model('scrap', scrapSchema);
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
    }
})

export const scrapCollection = model('scrap', scrapSchema);
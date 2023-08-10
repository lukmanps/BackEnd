import { Schema, model } from "mongoose";

export const reviewSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'user'
    },

    review: {
        type: String,
        required: true
    },

    value: {
        type: Number,
        required: true
    }
})

export const reviewCollection = model('review', reviewSchema);
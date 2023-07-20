import mongoose, { Schema, model } from "mongoose";

export const userSchema = new Schema({

    username: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true
    },

    phoneNo: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    status: {
        type: Boolean,
        default: true
    },

    wallet: {
        type: Number,
        default: 0
    }
});

export const userCollection = model('user', userSchema);
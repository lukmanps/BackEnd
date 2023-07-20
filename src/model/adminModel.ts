import mongoose, { Schema, model } from "mongoose";

export const adminSchema = new Schema({

    username: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

export const adminCollection = model('admin', adminSchema);
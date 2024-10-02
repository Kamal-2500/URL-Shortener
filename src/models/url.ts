import { Schema, model } from "mongoose";

const types = Schema.Types;

const urlSchema = new Schema({
    url: {
        type: types.String,
        required: true
    },
    shortenUrl: {
        type: types.String,
        required: true
    },
    expiresIn: {
        type: types.Date,
        required: true
    },
    clicked: {
        type: types.Number,
        default: 0
    }
});

export const Url = model('url', urlSchema);
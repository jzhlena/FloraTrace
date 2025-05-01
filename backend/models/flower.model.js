import mongoose from "mongoose";

import NoteSchema from './note.model.js';

const FlowerSchema = new mongoose.Schema({
    primary_name: {
        type: String,
        required: true
    },
    secondary_name: {
        type: String,
        required: false
    },
    user_name: {
        type: String,
        required: false
    },
    flower_num: {
        type: Number,
        required: false
    },
    shop_viewable: {
        type: Boolean,
        required: false
    },
    image_url: {
        type: String,
        required: false
    },
    flower_price: {
        type: Number,
        required: false
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    notes: {
        type: [NoteSchema],
        required: false
    }
}, {
    timestamps: true
}
);

const Flower = mongoose.model("Flower", FlowerSchema);

export default Flower;
import mongoose from 'mongoose';

export const reviewSchema = new mongoose.Schema({
        body: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            autopopulate: true,
        },
        creationTime: {
            type: Date,
            default: () => Date.now(),
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 10,
        },
        title: {
            type: String,
            required: true,
        }
});





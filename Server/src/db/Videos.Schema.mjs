import mongoose from 'mongoose';


export const videosSchema = new mongoose.Schema({
    results:[
        {
            iso_639_1: String,
            iso_3166_1: String,
            name: String,
            key: String,
            published_at:String,
            site: String,
            size: Number,
            type: String,
            official: Boolean,
            id :String,
        },
    ],
})


import mongoose from 'mongoose';
import {videosSchema} from './Videos.Schema.mjs';


const MoviesSchema = new mongoose.Schema({
     adult: String,
     backdrop_path: String,
     belongs_to_collection: {
        id: Number,
        name: String,
        poster_path: String,
        backdrop_path: String,

     },
     budget: Number,
     genres:[
         {id: Number, name:String}
     ],
     homepage:String,
     id: Number,
     imdb_id: String,
     original_language: String,
     original_title: String,
     overview: String,
     popularity: Number,
     poster_path: String,
     production_companies: [
        {id: Number, logo_path: String, name:String, origin_country:String}
    ],
    production_countries: [
        {iso_3166_1: String, name: String}
    ],
    release_date: String,
    revenue: Number,
    runtime: Number,
    spoken_languages: [
        {english_name: String, iso_639_1: String, name:String}
    ],
    status: String,
    tagline: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
    videos: {videosSchema},
    images: {
        backdrops: [
            {
                aspect_ratio: Number,
                height: Number,
                iso_639_1: String,
                file_path: String,
                vote_average: Number,
                vote_count: Number,
                width: Number  
            }
        ],
        logos: [
            {
                aspect_ratio: Number,
                height: Number,
                iso_639_1: String,
                file_path: String,
                vote_average: Number,
                vote_count: Number,
                width: Number
            },
        ],
        posters: [
            {
                aspect_ratio:Number,
                height: Number,
                iso_639_1: String,
                file_path: String,
                vote_average: Number,
                vote_count: Number,
                width: Number
            },
        ]
    },

   reviews: [{
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
}],
   
});

 
export const Movie = mongoose.model('Movie', MoviesSchema);
//export const Featured = mongoose.model('Featured', MoviesSchema);
// MoviesSchema.plugin(autopopulate);




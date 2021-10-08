import { Movie } from './db/Movies.model.mjs';
import 'express-async-errors';
import { getUserID } from './users.services.mjs';


export function getMovies() {
    return Movie
    .find()
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
}

export function getFeatured() {
    return Movie
    .find({vote_average: {$gt: 7}});
}


export function getMovie(id) {
    return Movie.findOne({id: id}).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
}


export async function addReview(movieID, review) {
    const movie = await getMovie(movieID);
    console.log("movieID is", movieID)
    console.log("movie is", movie)
    const user = await getUserID(review.userID);
  
    console.log("user",user)
    const editReview = {
        score: review.score,
        title: review.title,
        body: review.comments,
        author: review.userID
    }

   if (user){
    movie.reviews.push(editReview);
    await movie.save();
    const newMovie = await getMovie(movieID);
    return newMovie;

   }else{
       return "user doesn't exist!";
   }
}





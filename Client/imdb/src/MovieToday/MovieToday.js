import './MovieToday.css';
import { MoviesContext } from '../MoviesContext';
import { useContext, useEffect, useState} from 'react';
import star from '../Images/YellowStar.png';
import share from '../Images/Share.png';
import apps from '../Images/Apps.png';
import { useParams } from 'react-router';

export default function MovieToday() {
    

    const {movies} = useContext(MoviesContext);
    const {id} = useParams();
    const currentMovie = movies.find(movie => movie.id == id);
    console.log(currentMovie);
 
    return(
        <div className='movie-today'>
    {/* Name and rating - top ----------------------------- */}
        <div className='rating-root'>
            <div className='movie-today-header'>
                <div>
                    <h3 className='movie-name'>{currentMovie.original_title}</h3>
                    <span>{currentMovie.release_date}</span>
                </div>
                <div className='line'>
                    <div className='rating'>
                        <h3 className='element-title'>IMDb RATING</h3>
                        <div className='rating-element-bottom'>
                            <img className='star-img' src={star} />
                            <div className='rating-numbers-container'>
                                <span ><span className='current-rating'>{currentMovie.vote_average}</span>/10</span>
                                <span className='k'>{
                                    currentMovie.popularity // Need to round number K/M -------------
                                }K</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='rating'>
                        <h3 className='element-title'>YOUR RATING</h3>
                        <div className='rating-element-bottom'>
                            <img className='star-img' src={star} />
                            <p className='p'>Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/* Cast -User reviews ---------------------------------------------- */}
        <div className='cast-user-review-root'>
            <span>Cast & crew - Trivia - IMDbPro</span>
            <img src={apps} className='cast-user-icon' />
            <span>All topics</span>
            <div className='devider'></div>
            <img src={share} className='cast-user-icon' />
        </div>
    {/* Media ----------------------------------------------------------- */}
        <div className='media'>
            <img className='movie-img' src={`http://image.tmdb.org/t/p/w200${currentMovie.poster_path}`} />

            <iframe className='movie-video' src={`https://www.youtube.com/embed/${currentMovie.videos.results[0].key}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0" />
            <div className='movie-all-media'>
                    <div className='media-photos-videos'>
                            <span>Videos</span>
                    </div>
                    <div className='media-photos-videos'>
                            <span>Photos</span>
                    </div>
            </div>

        </div>
        </div>
  
        //</Link>
        

        
    )
}


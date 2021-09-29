import { MoviesContext } from './MoviesContext';
import {useContext} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './trailers.css';
import {
    Link,
  } from "react-router-dom";


export default function Trailers(){
    const {movies} = useContext(MoviesContext);


  return Array.isArray(movies) && movies.length > 0 ? (
      <Carousel interval={5000} nextLabel={null} prevLabel={null} keyboard={false}>
          {movies.map(movie => {
             return(
                <Carousel.Item>
                    <Link to={`/${movie.id}`}>
                    <img className="d-block w-100" src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/> 
                    </Link>
                        <Carousel.Caption className= "poster">
                            <img className="d-block w-100" src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`}/> 
                            <div className="plus"></div>
                        </Carousel.Caption>
                    <Link to={`/${movie.id}`}>
                    <div className="titleContainer">   
                        <Carousel.Caption className="play-icon">
                            <svg width="88" height="72" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="white" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg> 
                        </Carousel.Caption>
                        <Carousel.Caption className="title">
                            <p>{`"${movie.title}"`}</p>
                            <p>Watch the Trailer</p>
                        </Carousel.Caption>
                    </div> 
                    </Link>
                </Carousel.Item>
             ) 
          })}
    </Carousel>
  )
  : <div className="loading"> Loading... </div>
}


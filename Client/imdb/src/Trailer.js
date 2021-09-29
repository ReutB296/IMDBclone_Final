import { MoviesContext } from './MoviesContext';
import {useContext} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {
    useParams,
    Link,
    useHistory,
  } from "react-router-dom";
import './trailer.css';
import Reviews from './Reviews';
import { Spinner } from 'react-bootstrap';


export default function Trailer(){

    const { id } = useParams();
    const {movies} = useContext(MoviesContext);
    const selectedIndex = movies.findIndex(movie => movie.id == id);
    const selectedMovie = movies[selectedIndex];
    const history = useHistory();
   
 
    const PrevSelect = () =>{
        if (selectedIndex == 0){ //first movie
        history.push(`/${movies[(movies.length-1)].id}`);
        }else{
            history.push(`/${movies[selectedIndex-1].id}`);
        }   
    }

    const nextSelect = () =>{
        if(selectedIndex == (movies.length-1)){  //last movie
             history.push(`/${movies[0].id}`);
        }else{
            history.push(`/${movies[selectedIndex+1].id}`);
        }
    }
    

    return(
        <div className="container">
            { selectedMovie ? 
            <>
            <div className="Carouselcontainer">
                <div className="backContainer">
                <Link to={"/"}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#919191" role="presentation"><path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path></svg>
                    <div class="buttonBack">Back</div>
                </Link>
                 </div>
                <Carousel interval={null}  controls={false}>
                    <Carousel.Item>
                            <button className="prev" onClick={PrevSelect}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="white" role="presentation"><path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path></svg></button>
                            <iframe width="850" height="450" src={`https://www.youtube.com/embed/${selectedMovie.videos.results[0].key}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"></iframe>
                            <button className="next" onClick={nextSelect}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg></button>
                    </Carousel.Item>  
                </Carousel>
            </div>
            <div className="containerInfo">
                <div className="VideoInfo">
                    <div className="posterContainer">
                        <img src={`http://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}/>
                        <div className="plus"></div>
                    </div>
                    <div className="info">
                        <h5>{selectedMovie.original_title} {`(${selectedMovie.release_date.slice(0,4)})`}</h5>
                        {selectedMovie.genres.map(genre => <p> {genre.name},</p>)}
                    </div>
                </div>
                <hr className="devider"/>
                <div className="trailer-info">
                    <h2>Official Trailer</h2>
                    <h3>{selectedMovie.overview}</h3>
                </div>
            </div>
            <Reviews movieIndex={selectedIndex} selectedMovie={selectedMovie}/>
            </>
             : 
          <Spinner animation="border" role="status"></Spinner>
           }
        </div>
       
    )   
}
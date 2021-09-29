import './FeaturedToday.css';
import { MoviesContext } from '../MoviesContext';
import star from '../Images/YellowStar.png';
import { useContext } from 'react';
import {
    useParams,
    Link,
    useHistory,
  } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';   
import MovieCard from './MovieCard';

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button className='prev buttonL button' onClick={() => onClick()}>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="white" role="presentation"><path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
      </svg>
    </button>;
  };

  const CustoLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button className='prev buttonR button' onClick={() => onClick()}>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="white" role="presentation"><path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
      </svg>
    </button>;
  };


export default function FeaturedToday() {

    const {featured} = useContext(MoviesContext);

    return(
        
        <div className='featured-container'>
        
            <h2 className='section-header'>
              <Link to={'/gallery'}>Featured today</Link>
            </h2>
        
            <Carousel 
                responsive={responsive}
                infinite={true}
                itemClass='item-class'
                containerClass='my-container'
                className='class-name'
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustoLeftArrow />}
            > 
            {featured.map(movie => 
            <div className='carousel-card'>
                <MovieCard vote_average={movie.vote_average}
                           original_title={movie.original_title}
                           id={movie.id}
                           movieId={`/MovieToday/${movie.id}`}
                           imgUrl={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                >
                </MovieCard>
            </div>
                )}   
            </Carousel>;
        </div>
    )
}

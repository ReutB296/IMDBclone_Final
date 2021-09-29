import './Gallery.css';
//import InfiniteScroll from 'react-infinite-scroll-component';
import { useContext, useState } from "react";
import ReactPaginate from 'react-paginate';
import { MoviesContext } from "../MoviesContext";
//import { UserContext } from '../User.context';
import MovieCard from "./MovieCard";
import star from '../Images/YellowStar.png';
//import WishList from '../WishList/WishList';

export default function Gallery(isColored) {

    const {featured, fetchData} = useContext(MoviesContext);
    const [pageNumber, setPageNumber] = useState(0);

    const moviesPerPage = 12;
    const pagesVisited = pageNumber * moviesPerPage;
    const displayMovies = featured
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map(movie => <MovieCard  starSrc={star}
        vote_average={movie.vote_average}
        original_title={movie.original_title}
        movieId={`/MovieToday/${movie.id}`}
        id={movie.id}
        imgUrl={
            `https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        />)

        const changePage = ({selected}) => {
            setPageNumber(selected);
        }

        const pageCount = Math.ceil(featured.length / moviesPerPage)

    return(
        <div className='gallery-container'>
            <div className='gallery'>
                {displayMovies}
                <ReactPaginate 
                    previousLabel={'previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination-btns'}
                    previousLinkClassName={'previous-btn'}
                    nextLinkClassName={'next-btn'}
                    disabledClassName={'pagination-disabled'}
                    activeClassName={'pagination-active'}
                />
                <div className='pagination-background'></div>
                    
                
                {/* {featured.map(movie => <MovieCard  starSrc={star}
                vote_average={movie.vote_average}
                original_title={movie.original_title}
                movieId={`/MovieToday/${movie.id}`}
                id={movie.id}
                imgUrl={
                    `https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                />)} */}
            </div>
        </div>
        

        
            // <InfiniteScroll
            //     dataLength={featured.length}
            //     next={fetchData}
            //     hasMore={true}
            //     loader={<h4>Loading...</h4>}
            //     endMessage={
            //         <p style={{ textAlign: 'center' }}>
            //         <b>Yay! You have seen it all</b>
            //         </p>
            //     }
            // >
            // <div className='galerry-container'>
            //         <div className='gallery'>
            //             {featured.map(movie => <MovieCard  starSrc={star}
            //             vote_average={movie.vote_average}
            //             original_title={movie.original_title}
            //             id={movie.id}
            //             movieId={`/MovieToday/${movie.id}`}
            //             imgUrl={
            //                 `https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            //             />)}
            //         </div>
            //         </div>
            // </InfiniteScroll>
        
        
                

 
    )
}





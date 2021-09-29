import { MoviesContext } from './MoviesContext';
import { UserContext } from './User.context';
import {useContext, useCallback, useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import './reviews.css';
import Review from './Review';
import {
    useParams,
    useHistory,
  } from "react-router-dom";
import ReactPaginate from 'react-paginate';


export default function Reviews({selectedMovie, movieIndex}){
    console.log("selectedMovie from Reviews", selectedMovie)
    

    const { id } = useParams();
    console.log("id from use parames reviews" , id)
    const {movies, addReviewInternal} = useContext(MoviesContext);
    const {isLoggedIn, user, getToken, setIsLoggedIn, setUser} = useContext(UserContext);
    const [result, setResult] = useState("");
    const { handleSubmit, register, formState: { errors } } = useForm();
    let MovieReview = selectedMovie.reviews;
    const history = useHistory();
    const [pageNumber, setPageNumber] = useState(0);
   

    const addReview = useCallback((score, title, comments) => {
        const userID = user.id;
        const token = getToken();
        const movieID = id;

        fetch(`/api/Movies/${id}/reviews`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            score, title, comments, userID
          })
        })
          .then(response => response.json())
          .then(data => {
              setResult(data);
            //   const review = data.reviews[data.reviews.length - 1];
            //   addReviewInternal(movieIndex, review);

            }).catch(err => {
                console.log(err)
                localStorage.clear();
                setUser({});
                setIsLoggedIn(false);
                history.push('/signin');
            });
      }, []);
      
    const onSubmit = (values, e) => {
        addReview(values.score, values.title, values.comments);
        e.target.reset();
    }

    useEffect(() => {
        setResult("");
    }, [history.location.pathname]);


    const reviewsPerPage = 5;
    const pagesVisited = pageNumber * reviewsPerPage;
    const pageCount = Math.ceil(MovieReview.length / reviewsPerPage);

    const displayReviews = MovieReview
    .slice(pagesVisited, pagesVisited + reviewsPerPage)
    .map(MovieReview => <Review key={MovieReview.id} {...MovieReview} />);
    
    const changePage = ({ selected }) =>{
        setPageNumber(selected);
    };


    return(
        <div className="reviews-container">
           
        {isLoggedIn ? 
            <section className="reviews-section">
                <h2>Users Reviews</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Add your review</h3>

                    <label>Score</label>
                    <select
                        className="score"
                        {...register("score", {
                        required: "Required"
                    })}>
                        <option disabled>Select one...</option>
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>

                    <label className="titleLabel">Title</label>
                    <input
                        className="title"
                        type="text"
                        autoComplete= "off"
                        {...register("title", {
                        required: "Required",
                        maxLength: 30
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="title"
                        message = "The title cannot be longer than 30 characters"
                        render={({ message }) => <p>{message}</p>}
                    />

                    <label>Comments</label>
                    <textarea
                    className="comments"
                    autoComplete= "off"
                    maxlength="100"
                     {...register("comments", {
                        required: "Required",
                     })} 
                     />
                    {/* <input
                        className="comments"
                        type="text"
                        autoComplete= "off"
                        onKeyPress={e => {
                            if (e.key === 'Enter') e.preventDefault();
                          }}
                        {...register("comments", {
                        required: "Required",
                        })}
                    /> */}
        
                    <button type="submit">Submit</button>
                </form>
            {
                result ? 
                <div className="reviewAdded">
                 <p> Thank you for your review!</p>
                 <p> It will be added shortly. </p>
                </div>
                :
                ""
            }

            </section>
             :
             ""
        }
        <section className="reviews-list">
        <h2 className="usersReviews">Reviews</h2>
             { Array.isArray(movies) && MovieReview.length > 0 
             ? 
             <>
             {displayReviews}
             <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
             />
             </>
             :
             "No reviews yet..."
             }
         </section>
    </div>
   
    )
}
import './FeaturedToday.css';
import star from '../Images/YellowStar.png';
import Section from './Section';
import {useContext } from 'react';
import { MoviesContext } from '../MoviesContext';
import { UserContext } from '../User.context';
import {
    Link,
  } from "react-router-dom";
import WishList from '../WishList/WishList';



export default function MovieCard({movieId, id, imgUrl, vote_average, original_title}){
    
    const {isLoggedIn, user, setUser} = useContext(UserContext)

  
    
    const toggleWishList = (movieId, userId) => {
        console.log('user: ', user);
        console.log('wishlist: ', user.wishlist);
        console.log('user ID: ', user.id);
        console.log('movie id: ', id);

        fetch(`/api/users/${userId}/wishlist/${movieId}`, {  
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            'Accept': 'application/json'
          }).then(res => res.json()).then(mongoUser => {
              const user = {
                  ...mongoUser,
                  id: mongoUser._id
              }
              setUser(user);
          }) 
    }

      const isColored = user && user.wishlist && user.wishlist.includes(id);
    return(
    
        <div card-wrapper>
            <Link to={movieId}>
                <Section movie_url={imgUrl} />   
            </Link>
                 
        <div  className='fan-favorites-card-bottom'>
            <div className='carousel-card-rating'>
                <img className='star-img' src={star} />
                <p>{vote_average}</p>
                <WishList onClick={()=>toggleWishList(id, user.id)} 
                          isColored={isColored}/>
            </div>
            <h3 className='carousel-card-movie-title'>{original_title}</h3>
            <div className='watch-list-container'>
                <span className='watch-list'
                      onClick={()=>toggleWishList(id, user.id)}
                      isColored={isColored}><span className='plus'
                >
                    +
                </span>WatchList</span> 
                <div className='trailer-container'>
                    <span className='trailer'>Trailer</span>
                </div>
            </div>
           
        </div>
        </div>
        
    )
}
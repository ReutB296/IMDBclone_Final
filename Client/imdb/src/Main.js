import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from "react-router-dom";
import Trailers from "./Trailers";
import Trailer from "./Trailer";
import NavHeader from './NavHeader';
import MoviesProvider from './MoviesContext';
import FeaturedToday from "./FeaturedToday/FeaturedToday";
import MovieToday from './MovieToday/MovieToday';
import upNext from './Images/upNext.PNG';
import Gallery from "./FeaturedToday/Gallery";
import UsersProvider from "./User.context";
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';


export default function Main(){

return(
 <>
    <Router>
      <MoviesProvider>
        <UsersProvider>
        <div className='grid-header'>
                  <NavHeader />
          </div>
      <Switch>
  
          <Route path="/signin" exact>
          {/* <div className='grid-header'>
                  <NavHeader />
          </div> */}
          <div className='grid-signIn'>
            <SignIn/>
          </div>
          </Route>

          <Route path="/create_Account">
            <CreateAccount/>
          </Route>

          <Route path="/MovieToday/:id"> 
            <div className='grid-MovieToday'>
                <MovieToday />
            </div>
            {/* <div className='grid-header'>
                  <NavHeader />
            </div> */}
          </Route>
          <Route path='/gallery'>
          {/* <div className='grid-header'>
                  <NavHeader />
          </div> */}
            <Gallery />
          </Route>
          <Route path="/" exact>
            <div className='grid-trailers'>
                <Trailers />
                <img className= "upNext" src={upNext}/>
            </div>
                <FeaturedToday />
            {/* <div className='grid-header'>
                  <NavHeader />
            </div> */}
          </Route>

          <Route path="/:id">
            <Trailer />
            {/* <div className='grid-header'>
                  <NavHeader />
            </div> */}
          </Route>

          </Switch>
          </UsersProvider>
        </MoviesProvider>
      </Router>
</>

    );
}


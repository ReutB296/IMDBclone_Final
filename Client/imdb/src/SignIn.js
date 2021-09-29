import './signin.css';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import {
    Link, useHistory,
  } from "react-router-dom";
import { UserContext } from './User.context';
import { useContext, useEffect } from 'react';



export default function SignIn (){
    
    const { handleSubmit, register, formState: { errors } } = useForm();
    const {login, isLoggedIn, message, setMessage} = useContext(UserContext);
    const history = useHistory();

    const onSubmit = async (values) => {
        try {
            login(values.email, values.password);
        } catch(e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        if(isLoggedIn) {
            history.push('/');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setMessage("");
    }, [history.location.pathname]);


    return(
       <div className="signIn-container">
           <div className="signin-createAccount-container">
               <form onSubmit={handleSubmit(onSubmit)}>
                   <h1>Sign in</h1>
                   <label>Email</label>
                    <input
                    type="text"
                    autoComplete= "off"
                    {...register("email", {
                    required: "Required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                      }
                    })}
                    />
                    <ErrorMessage
                    errors={errors}
                    name="email"
                    message = "invalid Email"
                    render={({ message }) => <p>{message}</p>}
                    />

                    <label>Password</label>
                    <input
                    type="password"
                    autoComplete= "off"
                    {...register("password", {
                    required: "You must specify a password",
                    })}
                    />
                 
                    <button type="submit" >Sign In</button>
               </form>

               <p class="divider-text"><span>or</span></p>

               <Link to="/create_Account">
                    <button>Create a New Account</button>
               </Link>
               <p class="text-center"><small>By signing in, you agree to IMDb's Conditions of Use and Privacy Policy.</small></p>
           </div>

           <div className="perks">
                <h1>Benefits of your free IMDb account</h1>
                <div>
                    <p><strong>Personalized Recommendations</strong></p>
                    <p>Discover shows you'll love.</p>
                </div>
                <div>
                    <p><strong>Your Watchlist</strong></p>
                    <p>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                </div>
                <div>
                    <p><strong>Your Ratings</strong></p>
                    <p>Rate and remember everything you've seen.</p>
                </div>
                <div>
                    <p><strong>Contribute to IMDb</strong></p>
                    <p>Add data that will be seen by millions of people and get cool badges.</p>
                </div>
           </div>
       </div>
    );

}
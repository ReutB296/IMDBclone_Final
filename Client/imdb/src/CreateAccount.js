import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import './createAccount.css';
import logo from './Images/IMDb.png';
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    Link,
    useHistory,
  } from "react-router-dom";
import loading from './Images/loading-icegif-1.gif';


export default function CreateAccount (){

    const { handleSubmit, register, formState: { errors }, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const [result, setResult] = useState("");
    const history = useHistory();


    const signup = useCallback((email, username, password) => {
        fetch('/api/signup', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email, username, password
          })
        })
          .then(response => response.json())
          .then(data => {
              setResult(data);
            });
      }, []);


    const onSubmit = async (values, e) => {
        e.target.reset();
        try {
            signup(values.email, values.name, values.password);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setResult("");
     
    }, [history.location.pathname]);

    useEffect(() =>{
      if (result === true){
        setTimeout(() =>{
          history.push('./signin');
        },4000);
      }
    }, [result])
    

    return(
        <div className="createAccount-container">
             <Link to={"/"}>
                 <img className="logoImg" src={logo} alt='logo' />
              </Link>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Create account</h1>
                    <label>Your name</label>
                    <input
                    type="text"
                    autoComplete= "off"
                    {...register("name", {
                    required: "Required",
                    maxLength: 10
                    })}
                    />
                    <ErrorMessage
                    errors={errors}
                    name="name"
                    message = "User name cannot be longer than 10 characters"
                    render={({ message }) => <p>{message}</p>}
                    />

                    <label>Email</label>
                    <input
                    type="email"
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
                    name="Email"
                    message = "invalid Email"
                    render={({ message }) => <p>{message}</p>}
                    />

                    <label>Password</label>
                    <input
                    type="password"
                    autoComplete= "off"
                    placeholder="at least 6 characters"
                    {...register("password", {
                    required: "You must specify a password",
                    pattern: {
                      value:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\*\?\-\_\!]).{6,}$/
                    }
                    })}
                    />
                    <ErrorMessage
                    errors={errors}
                    name="password"
                    message = "password must contain at least 6 characters. Must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special characters"
                    render={({ message }) => <p>{message}</p>}
                    />

                    <label>Re-enter password</label>
                    <input
                    type="password"
                    autoComplete= "off"
                    {...register("password_repeat", {
                    required: "Required",
                    validate: value => value === password.current
                    })}
                    />
                    <ErrorMessage
                    errors={errors}
                    name="password_repeat"
                    message = "The passwords do not match"
                    render={({ message }) => <p>{message}</p>}
                    />

                    <button type="submit" >Create your IMDB account</button>

                  <div className="form-divider">Already have an account? <Link to="/signin">Sign-In</Link></div>
               </form>

               { result.length == 0 ?
                     "" :
                     result == true ?
                    // <div className="success">User created successfully <Link to="/signin"><span>Login</span></Link></div>
                    <div className="successContainer">
                        <p className="success"> User was created successfully! </p>
                        <p className="success2">Please login to continue</p>
                        <img className="loading-gif" src={loading}/>
                    </div>
                    : 
                    <div className="fail">User already exists  <i></i></div>
                    
                }

                <div class="a-divider-inner">© 1996-2021, Amazon.com, Inc. or its affiliates</div>
        </div>
    )

}
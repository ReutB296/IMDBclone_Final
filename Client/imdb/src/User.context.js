import React, { useCallback, useState } from 'react';
import jwt from 'jsonwebtoken'

export const UserContext = React.createContext();

export function getToken() {
  return localStorage.getItem('auth')
}

// const decoded =  jwt.decode(getToken(), {complete: true});
const decoded =  jwt.decode(getToken());

export default function UsersProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(decoded);
  const [message, setMessage] = useState("");


  const login = useCallback((email, password) => {
    fetch('/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    })
      .then(response => response.json())
      .then(data => {
     
        if(data.user){
          setUser(data.user);
          setIsLoggedIn(true);
          localStorage.setItem('auth', data.token);

        }else{
          setMessage(data.message);
        }
      });
  }, []);

  console.log(isLoggedIn);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLoggedIn,
      setIsLoggedIn,
      login,
      message,
      setMessage,
      getToken,
    }}>
      {children}
    </UserContext.Provider>
  );
}

import React, { useState, useRef, useContext } from 'react';

import AuthContext from '../auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
//   const { token, isLoggedIn, login, logout } = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation
    
    setIsLoading(true);
    if (isLogin) {
        if (localStorage.getItem('UsersLogin')) {
            const allStoredUsers = JSON.parse(localStorage.getItem('UsersLogin'));
            const matchedUser = allStoredUsers.filter(user => {
                return enteredEmail === user.email && enteredPassword === user.password;
            })
            if (matchedUser.length) {
                // set currently logged user in local storage
                window.localStorage.setItem("loggedIn", matchedUser[0])
                console.log('Login successful')
                authCtx.login("loginToken")
            } else {
                console.log('Wrong credentials')
            }
            setIsLoading(false);
        } else {
            console.log('Wrong credentials') // Don't say "Not a registered user"
            setIsLoading(false);
        }
        
    } else { 
        let storedUsers = window.localStorage.UsersLogin ? JSON.parse(window.localStorage.UsersLogin) : [];
        storedUsers.push({ email: enteredEmail, password: enteredPassword});
        window.localStorage.setItem('UsersLogin', JSON.stringify(storedUsers));
        setIsLoading(false);
        window.location.reload(false)
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
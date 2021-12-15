import React, {useState, useRef, useContext} from 'react';

import AuthContext from '../auth-context';
import classes from './AuthForm.module.css';


const AuthForm = ({addUser, setLogin}) => {
    const userNameInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);
    // const { token, isLoggedIn, login, logout } = useContext(AuthContext)

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredUserName = userNameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        if (isLogin) {
            setLogin(enteredUserName, enteredPassword)
            setIsLoading(false);
        } else {
            addUser(enteredUserName, enteredPassword).then(_ => {
                window.location.reload(false)
                setIsLoading(false);
            })
        }
    }
    return (
        <section className={
            classes.auth
        }>
            <h1>{
                isLogin ? 'Login' : 'Sign Up'
            }</h1>
            <form onSubmit={submitHandler}>
                <div className={
                    classes.control
                }>
                    <label htmlFor='text'>Your Email</label>
                    <input type='text' id='userName' required
                        ref={userNameInputRef}/>
                </div>
                <div className={
                    classes.control
                }>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required
                        ref={passwordInputRef}/>
                </div>
                <div className={
                    classes.actions
                }>
                    {
                    !isLoading && (
                        <button>{
                            isLogin ? 'Login' : 'Create Account'
                        }</button>
                    )
                }
                    {
                    isLoading && <p>Sending request...</p>
                }
                    <button type='button'
                        className={
                            classes.toggle
                        }
                        onClick={switchAuthModeHandler}>
                        {
                        isLogin ? 'Create new account' : 'Login with existing account'
                    } </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;

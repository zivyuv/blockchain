import Home from "../home/Home";
import NewCard from "../new_offer_card/NewCard";
import MyStatus from "../my_status/MyStatus";
import Card from "../card/Card";
import Explore from "../explore/Explore";
import {Route, Switch, Redirect} from "react-router";
import React, {useContext, useRef} from 'react';
import {accountContext} from '../AccountContext';
import AuthContext from "../auth-context";
import AuthForm from "../auth/AuthForm";

const Main = ({
    usersCount,
    giveNTake,
    cards,
    postOffer,
    buyOffer
}) => {
    const {account, user, addUser} = useContext(accountContext)
    const userNameRef = useRef();

    if (user) {
        console.log("logged in")
        return (
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/welcome'/>
                </Route>
                <Route path='/welcome'>
                    <Home usersCount={usersCount}/>
                </Route>
                <Route path='/new-card'>
                    <NewCard postOffer={postOffer}/>
                </Route>
                <Route path='/my-status'>
                    <MyStatus user={user}/>
                </Route>
                <Route path='/explore'>
                    <Explore user={user}
                        contractCards={cards}
                        buyOffer={buyOffer}/>
                </Route>

            </Switch>
        );
    } else {

        const submitHabdler = () => {
            const enteredUserName = userNameRef.current.value
            addUser(enteredUserName)
        }
        return (
            <Switch>
                <Route path='/welcome' exact>
                    <div className="card text-center mt-5">
                        <div className="card-header ">
                            <h1>Hey there!!</h1>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Nice to meet you, account number <br/> </h5>
                            <p>{account}</p>
                            <p className="card-text">Before we get started, please tell us your name:</p>
                            <form onSubmit={submitHabdler}>
                                <input className="form-group mx-sm-3 mb-2" type="text" placeholder="Enter name..."  required ref={userNameRef}/>
                                <input className="btn btn-dark" type="submit" value="Sign Up"></input>
                            </form>
                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </Route>
                <Route path='/'>
                    <Redirect to='/welcome'/>
                </Route>
            </Switch>
        );
    }

}

export default Main;

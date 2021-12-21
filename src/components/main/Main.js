import Home from "../home/Home";
import HomeStyle from '../home/Home.module.css'
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
    cardsCount, 
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
                    <Home cardsCount={cardsCount} usersCount={usersCount}/>
                </Route>
                <Route path='/new-card'>
                    <NewCard postOffer={postOffer}/>
                </Route>
                <Route path='/my-status'>
                    <MyStatus allCards={cards}/>
                </Route>
                <Route path='/explore'>
                    <Explore user={user}
                        contractCards={cards}
                        buyOffer={buyOffer}
                        giveNTake={giveNTake}/>
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
                <div className={HomeStyle.container}>
                    {/* <div className="card text-center mt-5"> */}
                        {/* <div className="card-header text-info"> */}
                            <h1 className="text-info"><strong>Hey there!!</strong></h1>
                        {/* </div> */}
                        {/* <div className="card-body"> */}
                            <h5 className="text-info">Nice to meet you, account number <br/> </h5>
                            <p className="text-light">{account}</p>
                            <p className="text-info">Before we get started, please tell us your name:</p>
                            <form onSubmit={submitHabdler}>
                                <input className="form-group mx-sm-3 mb-2" type="text" placeholder="Enter name..."  required ref={userNameRef}/>
                                <input className="btn btn-dark" type="submit" value="Sign Up"></input>
                            </form>
                        {/* </div> */}
                        {/* <div className="card-footer"> */}
                        {/* </div> */}
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

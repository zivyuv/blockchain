import Home from "../home/Home";
import NewCard from "../new_offer_card/NewCard";
import MyStatus from "../my_status/MyStatus";
import Card from "../card/Card";
import Explore from "../explore/Explore";
import {Route, Switch, Redirect} from "react-router";
import React, {useContext} from 'react';
import {accountContext} from '../AccountContext';
import AuthContext from "../auth-context";
import AuthForm from "../auth/AuthForm";

const Main = ({ usersCount, giveNTake, cards, postOffer }) => {
    const { account, addUser }  = useContext(accountContext)
    const { token, isLoggedIn, login, logout } = useContext(AuthContext)

    if (isLoggedIn) {
        console.log("logged in")
    return (
        <Switch>
            <Route path='/' exact>
                <Redirect to='/welcome'/>
            </Route>
            <Route path='/welcome'>
                <Home usersCount={usersCount}
                    />
            </Route>
            <Route path='/new-card'>
                <NewCard postOffer={postOffer}/>
            </Route>
            <Route path='/my-status'>
                <MyStatus giveNTake={giveNTake} />
            </Route>
            <Route path='/explore'>
                <Explore giveNTake={giveNTake} contractCards={cards}/>
            </Route>

        </Switch>
    );}
    else {
        console.log("NOT logged in")

        return (
            <Switch>
                <Route path='/welcome' exact>
                    <AuthForm addUser={addUser}/>
                </Route>
                <Route path='/'>
                    <Redirect to='/welcome'/>
                </Route>
            </Switch>
        );
    }

}

export default Main;

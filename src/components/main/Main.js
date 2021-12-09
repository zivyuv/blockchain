import Home from "../home/Home";
import NewCard from "../new_offer_card/NewCard";
import MyStatus from "../my_status/MyStatus";
import Card from "../card/Card";
import {Route, Switch, Redirect} from "react-router";
import React, { useState } from 'react';
import { UserContext } from "../UserContext";

const Main = ({getMyCards, getAllCards, account, usersCount}) => {
    const [user, setUser] = useState(null);

    return (
        <Switch>
            <Route path='/' exact>
                <Redirect to='/welcome'/>
            </Route>
            <Route path='/welcome'>
                <Home usersCount={usersCount}/>
            </Route>
            <Route path='/new-card'
                component={NewCard}></Route>
            <Route path='/my-status'>
                <MyStatus getMyCards={getMyCards} account={account}/>
            </Route>
            {/* <Route path='/explore'>
                <Explore allCards={getAllCards}/>
            </Route> */}
        </Switch>

    );

}

export default Main;

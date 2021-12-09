import Home from "../home/Home";
import NewCard from "../new_offer_card/NewCard";
import MyStatus from "../my_status/MyStatus";
import Card from "../card/Card";
import {Route, Switch, Redirect} from "react-router";
import React from 'react';

const Main = ({getMyCards, getAllCards}) => {

    return (
        <Switch>
            <Route path='/' exact>
                <Redirect to='/home'/>
            </Route>
            <Route path='/home'
                component={Home}></Route>
            <Route path='/new-card'
                component={NewCard}></Route>
            <Route path='/my-status'>
                <MyStatus getMyCards={getMyCards}/>
            </Route>
            {/* <Route path='/explore'>
                <Explore allCards={getAllCards}/>
            </Route> */}
        </Switch>

    );

}

export default Main;

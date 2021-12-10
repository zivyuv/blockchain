import Home from "../home/Home";
import NewCard from "../new_offer_card/NewCard";
import MyStatus from "../my_status/MyStatus";
import Card from "../card/Card";
import Explore from "../explore/Explore";
import {Route, Switch, Redirect} from "react-router";
import React, {useContext} from 'react';
import {accountContext} from '../AccountContext';

const Main = ({getMyCards, getAllCards, usersCount}) => {

    const { account, setAccount }  = useContext(accountContext)

    return (
        <Switch>
            <Route path='/' exact>
                <Redirect to='/welcome'/>
            </Route>
            <Route path='/welcome'>
                <Home usersCount={usersCount}
                    />
            </Route>
            <Route path='/new-card'
                component={NewCard}></Route>
            <Route path='/my-status'>
                <MyStatus getMyCards={getMyCards}/>
            </Route>
            <Route path='/explore'>
                <Explore allCards={getAllCards}/>
            </Route>

        </Switch>

    );

}

export default Main;

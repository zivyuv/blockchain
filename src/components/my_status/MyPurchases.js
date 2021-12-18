import {array} from 'fast-check'
import React from 'react'
import { BiLike } from "react-icons/bi";

const MyPurchases = ({user, myCards}) => {

    const userDataStr = window.localStorage.getItem("UsersMap")
    userDataStr.replace('[', '{').replace(']', '}')
    const usersData = JSON.parse(userDataStr)
    const currUser = window.localStorage.getItem("loggedIn")
    let i = 0;
    let userId = ""
    while (true) {
        if (usersData[i].userName == currUser) {
            userId = usersData[i].userId
            break;
        }
        i++;
    }
    return (
        <div className="fill-window">
              <div className="card-header bg-light border-info text-info" >
              <h1>My Previous Purchases</h1>
            <h5><strong>You can reflect back on recent purchases and rate their sellers!</strong></h5>
                </div>

            </div>
           
      
    );
}
    

export default MyPurchases;

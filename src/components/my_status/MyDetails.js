import {array} from 'fast-check'
import React from 'react'

const MyDetailes = () => {

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
        <div className="container">
            <h1>Hello {
                currUser.toUpperCase()
            }!</h1>
            <div className="row">
                <div className="col-4"
                    style={
                        {borderRight: "2px solid black"}
                }>
                    <ul className="list-group">
                        <li className="list-group-item">You are one of XX users we have
                        </li>
                        <li className="list-group-item">You have XX active listings
                        </li>
                        <li className="list-group-item">You sold XX services untill now</li>
                        <li className="list-group-item">You have purchased XX services</li>
                        <li className="list-group-item">Your rating is XX</li>
                    </ul>
                </div>
                <div className="col-8"> sdfszdg</div>
            </div>
        </div>
    );
}

export default MyDetailes;

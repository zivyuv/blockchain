import { array } from 'fast-check'
import React from 'react'

const MyDetailes = () => {

    const userDataStr = window.localStorage.getItem("UsersMap")
    userDataStr.replace('[', '{').replace(']','}')
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
            <h1>Hello {currUser.toUpperCase()}!</h1>
            <div className="row">
                <div className="col-4" style={{borderRight: "2px solid black"}}>
                <ul className="list-group">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>    
                </div>
                <div className="col-8">col-8</div>
            </div>
        </div>
    );
}

export default MyDetailes;

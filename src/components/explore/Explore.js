import ExploreStyle from './Explore.module.css'
import React from 'react';
import Card from '../card/Card'

const Explore = ({giveNTake, cards}) => {

    // get user id from local storage
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
    // let cards = []
    // for(let i=0; i<10; i++) {
    //     let card = <Card header="sdfgsdfgsdfgsdf" content="dfgsdfgsdfgsdfgsdfgsdfbvcx\nsgsdfgsdfg" price="1123" submitHandler={()=> console.log(i)}/>
    //     cards.push(card)
    // }

    const arrayChunk = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) 
            chunks.push(array.splice(0, n));
        
        return chunks;
    };

    return (
        <div className="container">
            {
                arrayChunk(cards, 2).map((row, i) => (
                    <div className="row">
                        {
                            row.map((col, i) => (
                                <div className="col">{col}</div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default Explore;

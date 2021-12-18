import {array} from 'fast-check'
import React from 'react'
import { BiLike } from "react-icons/bi";
import Card from '../card/Card'

const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) 
        chunks.push(array.splice(0, n));
    
    return chunks;
};
const MyProfile = ({ user, myCards }) => {

    let cards = []
    for(let i=0; i<myCards.length; i++) {
        const card = <Card header={myCards[i][1]} content={myCards[i][2]} price={myCards[i][3]} soldCount={myCards[i][4]} buyHandler={()=> console.log()}/>
        cards.push(card)
    }

    return (
        // <div className="fill-window">
              <div className="card-header bg-light border-info text-info" >
              <h1>Hello {
                user.name.toUpperCase()
            }, Welcome Back!</h1>
            <h5></h5>
            <div className="row">
                <div className="col-4"
                    style={
                        {borderRight: "2px solid black"}
                }><strong>Here are a few facts about you:</strong>
                    <ul className="list-group ">
                        <li className="list-group-item bg-dark border-info text-info"><strong>You are one of XX active users!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have XX active listings!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike>
                        </li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have sold XX services!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have purchased XX services!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>Your user rating is XX!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                    </ul>
                </div>
                
                <div className="col-8"><strong>My Active Cards:</strong> 
                    {
                        arrayChunk(cards, 2).map((row) => (
                            <div className="row" style={{float: "right"}}>
                        {
                            row.map((col) => (
                                <div className="col" >{col}</div>
                            ))
                        }
                    </div>
                        ))
                    }
                </div>
            </div>
           
            </div>
        //  </div>
    );
}

export default MyProfile;

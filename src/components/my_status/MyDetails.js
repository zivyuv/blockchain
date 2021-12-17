import React from 'react'
import { BiLike } from "react-icons/bi";
import Card from '../card/Card'

const MyProfile = ({ user, myCards, buyOffer}) => {

    let cards = []
    let soldCount = 0
    for(let i=0; i<myCards.length; i++) {
        const card = <Card header={myCards[i][1]} content={myCards[i][2]} price={myCards[i][3]} soldCount={myCards[i][4]} buyHandler={()=> buyOffer(myCards[i].id, myCards[i].price)}/>
        if (myCards[i].soldCount > 0) {
            soldCount++
        }
        cards.push(card)
    }

    return (
        <div className="fill-window">
              <div className="card-header bg-light border-info text-info" >
              <h1>Hello {
                user.name.toUpperCase()
            }, Welcome Back!</h1>
            <h5><strong>Here are a few facts about you:</strong></h5>
            <div className="row">
                <div className="col-4"
                    style={
                        {borderRight: "4px solid black"}
                }>
                    <ul className="list-group ">
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have {myCards.length} active listings!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike>
                        </li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have sold {soldCount} services!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have purchased XX services!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>Your user rating is {user.rate}!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                    </ul>
                </div>
                <div className="col-8"><strong>My Active Cards:</strong> 
                    {
                        cards.map((card) => (
                            <div className="col">{card}</div>
                        ))
                    }
                </div>
            </div>
           
            </div>
         </div>
    );
}

export default MyProfile;

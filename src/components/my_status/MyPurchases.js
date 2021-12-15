import React from 'react'
import Card from '../card/Card'

const MyPurchases = ({user, myCards}) => {
    let cards = []
    for(let i=0; i<myCards.length; i++) {
        const card = <Card header={myCards[i][1]} content={myCards[i][2]} price={myCards[i][3]} soldCount={myCards[i][4]} buyHandler={()=> console.log()}/>
        cards.push(card)
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

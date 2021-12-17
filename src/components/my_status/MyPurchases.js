import React from 'react'
import PurchasedCard from './PurchasedCard'

const MyPurchases = ({user, myCards, rateSeller}) => {
    let cards = []
    for (let i = 0; i < myCards.length; i++) {
        const card = <PurchasedCard header={
                myCards[i][1]
            }
            content={
                myCards[i][2]
            }
            rateSeller={
                () => rateSeller(myCards[i].owner)
            }/>
        cards.push(card)
    }
    return (
        <div className="fill-window">
            <div className="card-header bg-light border-info text-info">
                <h1>My Previous Purchases</h1>
                <h5>
                    <strong>You can reflect back on recent purchases and rate their sellers!</strong>
                </h5>
                <div className='container'> {
                    cards.map((card) => (
                        <div className="col">
                            {card}</div>
                    ))
                } </div>
            </div>

        </div>


    );
}


export default MyPurchases;

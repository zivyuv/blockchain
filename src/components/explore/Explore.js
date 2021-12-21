import ExploreStyle from './Explore.module.css'
import React from 'react';
import Card from '../card/Card'
import CardStyle from '../new_offer_card/NewCard.module.css'



const ETHVALUE = 4000 // about 4000 dollars
const Explore = ({user, contractCards, buyOffer, giveNTake}) => {
    console.log(user);
    let cards = []
    for (let i = 0; i < contractCards.length; i++) {
        const ethPrice = parseInt(contractCards[i][3]) / ETHVALUE
        const priceToPay = window.web3.utils.toWei(ethPrice.toString(), 'Ether')
        const ownerRate = contractCards[i].ownerRate
        console.log(ownerRate)
        console.log(contractCards[i])
        console.log(user)
        const card = <Card header={
                contractCards[i][1]
            }
            content={
                contractCards[i][2]
            }
            price={
                contractCards[i][3]
            }
            soldCount={
                contractCards[i][4]
            }
            buyHandler={
                () => buyOffer(contractCards[i][0], priceToPay)
            }
            ownerRate={ownerRate}/>
        cards.push(card)
    }

    const arrayChunk = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) 
            chunks.push(array.splice(0, n));
        


        return chunks;
    };

    if (cards.length == 0) {
        return (
            <div className={CardStyle.container}>
            <div className="text-center text-info mt-5">
                <div className="">
                    <h1>Hey there!!</h1>
                    <h4>There are currently no services available.</h4>
                    <h4>Be the first one to offer your service, by clicking the <strong>'New Offer'</strong> button above!</h4>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            {
            arrayChunk(cards, 2).map((row, i) => (
                <div className="row">
                    {
                    row.map((col, i) => (
                        <div className="col">
                            {col}</div>
                    ))
                } </div>
            ))
        } </div>
    );
}

export default Explore;

import HomeStyle from './Home.module.css'
import React from 'react';

const Home = ({usersCount, cardsCount}) => {
    return (
        <div className={HomeStyle.container}>
            <h1><strong> Welcome To Our Store</strong></h1>
            <h2>We currently have {usersCount} users!</h2>
            <h2>We currently have {cardsCount} offers awaiting!</h2>
            <h5 style={{marginTop: "1rem"}}>If you want to join our market place - you must have a Metamask account!</h5>
            <a href="https://metamask.io/">Open an account at Metamask</a>
            <h6 style={{marginTop: "1.5rem"}}>If you already have one....</h6>
            <h6>Lets get started!</h6>
            <h6 style={{marginTop: "1.5rem"}}>Use the above navbar to explore current offers, or add your own!</h6>

            
        </div>
    );
}

export default Home;

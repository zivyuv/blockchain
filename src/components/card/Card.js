import CardStyle from './Card.module.css'
import React from 'react';

const Card = ({header, content, price, submitHandler}) => {

    // const strPrice = "Buy" + price
    const strPrice = "Buy\tfor\t" + 19 + "$"
    return (
        <div>
            <div className={CardStyle.card}>
                <h1>What I'm offering</h1>
                <p>About me....About me....About me....About me....About me....About me....About me....About me....</p>
                <p>Some text about the the offer..Some text about the the offer..Some text about the the offer..Some text about the the offer..Some text about the the offer..</p>
                <p>Some text about the the offer..</p>
                <p>Some text about the the offer..</p>
                <p>Some text about the the offer..</p>
                <p>Some text about the the offer..</p>

                    <div className="container"> 
                        <h5 className="badge badge-success" >my rate</h5>
                        <h5 className="badge badge-success" >times bought</h5>
                        <a className="badge badge-success" href="https://www.google.com/">link to social / prev work</a>

                        <span><button>{strPrice}</button></span>
                    </div>
            </div>
        </div>
    );
}

export default Card;

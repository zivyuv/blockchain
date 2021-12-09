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

                <p>
                    <ul className={CardStyle.ul}> 
                        <li className={CardStyle.li} >my rate</li>
                        <li className={CardStyle.li} >times bought</li>
                        <li className={CardStyle.li} ><a href="https://www.google.com/">link to social / prev work</a></li>

                        <li><button>{strPrice}</button></li>
                    </ul>
                </p>
            </div>
        </div>
    );
}

export default Card;

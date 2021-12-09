import CardStyle from './Card.module.css'
import React from 'react';

const Card = ({header, content, price, submitHandler}) => { // const strPrice = "Buy" + price
    const strPrice = "Buy\tfor\t" + 19 + "$"
    return (
        <div className="card border-success mb-3"
            style={
                {margin: "2rem"}
        }>
            <div className="card-header bg-transparent border-success">Header</div>
            <div className="card-body text-success">
                <h5 className="card-title">Success card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card-footer bg-transparent ">
                <button className="btn btn-dark btn-lg btn-block">sadfasd</button>
            </div>
            <div className="card-footer bg-transparent ">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary">Rate Seller</button>
                    <button type="button" className="btn btn-info">To social media</button>
                </div>
            </div>
        </div>
    );
}

export default Card;

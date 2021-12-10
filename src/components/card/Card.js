import CardStyle from './Card.module.css'
import React from 'react';

const Card = ({header, content, price, submitHandler}) => { // const strPrice = "Buy" + price
    const strPrice = "Buy\tfor\t" + 19 + "$"
    return (
        <div className="card border-success mb-3"
            style={
                {margin: "2rem"}
        }>
            <div className="card-header bg-transparent border-success">
                {header}
            </div>
            <div className="card-body text-success">
                <h5 className="card-title">Success card title</h5>
                <p className="card-text">{content}</p>
            </div>
                <button className="btn btn-dark btn-sm" style={{marginLeft: "3rem", marginRight: "3rem"}}>Buy for {price}$</button>
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

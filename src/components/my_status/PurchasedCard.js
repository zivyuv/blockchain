import React from 'react';
import Badge from '@material-ui/core/Badge';
import {Button} from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {BsFillStarFill} from "react-icons/bs";


const PurchasedCard = ({header, content, rateSeller, ownerRate}) => { // const strPrice = "Buy" + price
    return (
        <div className="card border-info bg-dark mb-4"
            style={
                {margin: "3rem"}
        }>
            <div className="card-header bg-dark border-info">
                <h5 className="card-title text-light bg-dark"
                    style={
                        {textAlign: "center"}
                }>
                    {header}
                </h5>
            </div>
            <div className="card-body text-info">
                <h5 className="card-title text-light bg-dark"
                    style={
                        {textAlign: "center"}
                }>Hi there! I am offering:</h5>
                <p className="card-text text-light"
                    style={
                        {textAlign: "center"}
                }>
                    {content}</p>
                {/* //if soldcount = 0, should say "Be the first to recieve this service " */}

            </div>
            {/* <ButtonGroup aria-label="Basic example">
                <Button variant="info"style={{marginBottom: "1rem", textAlign: "center"}}>Buy for {price}$</Button>
                <Button variant="light"style={{marginBottom: "1rem",textAlign: "center"}}>Rate Seller</Button>
                </ButtonGroup> */}
            <div className="card-footer bg-dark border-info ">

                <button className="button" className="btn btn-light"
                    style={
                        {
                            marginLeft: "3rem",
                            marginRight: "3rem"
                        }
                }>Check Out Profile</button>
                <button className="button" className="btn btn-light" onClick={rateSeller}>Rate Seller</button>

            </div>
        </div>
    );
}

export default PurchasedCard;

import {array} from 'fast-check'
import React from 'react'
import { BiLike } from "react-icons/bi";

const MyProfile = ({ user }) => {

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
                        <li className="list-group-item bg-dark border-info text-info"><strong>You are one of XX active users!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have XX active listings!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike>
                        </li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have sold XX services!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>You have purchased XX services!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                        <li className="list-group-item bg-dark border-info text-info"><strong>Your user rating is XX!</strong>
                        <BiLike style={{textAlign: "center", marginLeft: "1rem" , marginButtom:"0.5rem"}}></BiLike></li>
                    </ul>
                </div>
                <div className="col-8"><strong>My Active Cards:</strong> </div>
            </div>
           
            </div>
         </div>
    );
}

export default MyProfile;

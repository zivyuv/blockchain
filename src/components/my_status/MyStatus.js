import MyStatusStyle from './MyStatus.module.css'
import React, {useContext} from 'react';
import {accountContext} from '../AccountContext'

const MyStatus = () => {

    const {account, setAccount} = useContext(accountContext)

    return (
        <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
            </div>
        </div>
    );
}

export default MyStatus;

// <div className="text-center mt-5">
//     {account}
// </div>

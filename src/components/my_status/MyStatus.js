import MyStatusStyle from './MyStatus.module.css'
import React, {useContext} from 'react';
import {accountContext} from '../AccountContext'
import MyDetailes from './MyDetails';
import MyPurchases from './MyPurchases';

const MyStatus = () => {

    const {account, setAccount} = useContext(accountContext)

    return (
        <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a className="nav-link active text-dark" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><strong>Profile</strong></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><strong>Purchase History</strong></a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="fill-window">
                        <MyDetailes />
                    </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="fill-window">
                        <MyPurchases />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyStatus;

// <div className="text-center mt-5">
//     {account}
// </div>

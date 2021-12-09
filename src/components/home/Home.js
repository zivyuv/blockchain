import HomeStyle from './Home.module.css'
import React from 'react';

const Home = ({usersCount}) => {
    return (
        <div className={HomeStyle.container}>
            <h1><strong> Welcome To Our Store</strong></h1>
            <h2>We currently have {usersCount} users!</h2>
            <p>Some detailes about using the app</p>
            <p>Some detailes about using the app</p>
            <p>Some detailes about using the app</p>
            <p>Some detailes about using the app</p>
            <p>Some detailes about using the app</p>
            <p>Some detailes about using the app</p>
            <p>{usersCount}</p>
            
        </div>
    );
}

export default Home;

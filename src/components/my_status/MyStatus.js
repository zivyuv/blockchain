import MyStatusStyle from './MyStatus.module.css'
import React from 'react';

const MyStatus = ({account}) => {
    
    return (
        <div className="text-center mt-5">
            {account}
        </div>
    );
}

export default MyStatus;

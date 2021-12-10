import MyStatusStyle from './MyStatus.module.css'
import React, { useContext } from 'react';
import { accountContext } from '../AccountContext'

const MyStatus = () => {

    const { account, setAccount }  = useContext(accountContext)

    return (
        <div className="text-center mt-5">
            {account}
        </div>
    );
}

export default MyStatus;

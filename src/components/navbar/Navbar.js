import NavbarStyle from './Navbar.module.css'
import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {accountContext} from '../AccountContext';


const Navbar = ({addUser}) => {

    const {account, setAccount} = useContext(accountContext)

    const style = {
        'display': 'block',
        'color': 'white',
        'textAlign': 'center',
        'padding': '14px 16px',
        'textDecoration': 'none'
    }
    return (
        <header>
            <ul className={
                NavbarStyle.ul
            }>
                <li className={
                    NavbarStyle.li
                }>
                    <NavLink style={style}
                        to="/welcome">Welcome</NavLink>
                </li>
                <li className={
                    NavbarStyle.li
                }>
                    <NavLink style={style}
                        to="/explore">Explore</NavLink>
                </li>
                <li className={
                    NavbarStyle.li
                }>
                    <NavLink style={style}
                        to="/my-status">MyStatus</NavLink>
                </li>
                <li className={
                    NavbarStyle.li
                }>
                    <NavLink style={style}
                        to="/new-card">New Offer</NavLink>
                </li>
            </ul>
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Change account
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" type="button" onClick={() => setAccount(0)}>0</button>
                <button className="dropdown-item" type="button" onClick={() => addUser("ssdfsdf", "sdfsd")}>1</button>
                <button className="dropdown-item" type="button" onClick={() => setAccount(2)}>2</button>
                <button className="dropdown-item" type="button" onClick={() => setAccount(3)}>3</button>
                <button className="dropdown-item" type="button" onClick={() => setAccount(4)}>4</button>
                <button className="dropdown-item" type="button" onClick={() => setAccount(5)}>5</button>
                <button className="dropdown-item" type="button" onClick={() => setAccount(6)}>6</button>
                <button className="dropdown-item" type="button" onClick={() => setAccount(7)}>7</button>
                <button className="dropdown-item" type="button" onClick={() => setAccount(8)}>8</button>
                <button className="dropdown-item" type="button" onClick={() => setAccount(9)}>9</button>
            </div>
        </div>
        </header>
    );
}

export default Navbar;

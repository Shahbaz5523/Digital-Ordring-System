import React from 'react'
import './LoginContainer.css';
import Header from '../Header/Header';
import Login from '../login/Login';

export default function LoginContiainer() {
    return (
        <div className="LoginContainer">
            <div className="filter">
              <Header/>
              <Login/>
            </div>
        </div>
    )
}

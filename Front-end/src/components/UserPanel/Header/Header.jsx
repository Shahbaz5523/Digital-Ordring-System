import './Header.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'

export default function Header() {

    const [name, setname] = useState("")
   
    useEffect(() => {
       setname( Cookies.get("name"))
        
    }, [])
    

    return (
        <div className="header">
            <h1>Digital Ordering System</h1>
            <h3>{name}</h3>
        </div>
    )
}

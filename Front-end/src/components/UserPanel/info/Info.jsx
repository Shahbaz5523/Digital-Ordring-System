import './Info.css';
import React from "react";

export default function Info() {
  return (
    <div className='userPanelInfo'>
      <div className="Content">
        <img src="logo.png" alt="logo" />
        <h1>Food Menu</h1>
        <p>Order your food from bleow</p>
        <button><a href="#menu">Available Foods</a></button>
      </div>
    </div>
  );
}

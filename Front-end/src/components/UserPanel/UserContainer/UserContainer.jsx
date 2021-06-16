import React, { useState, useEffect } from "react";
import "./UserContainer.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import components
import "../Header/Header";
import Header from "../Header/Header";
import Info from "../info/Info";
import Category from "../Category/Category";
import CardContainer from "../CardContainer/CardContainer";
import AddToCart from "../AddToCart/AddToCart";

// import category Context here to send data to all the childs
import CategoreyContext from "../../Context/CategoryContex";
import CheckCartContext from "../../Context/CheckCartContext";
import cartContext from "../../Context/cartContext";
import feedbackContext from "../../Context/feedbackContext";
import ShowFeedback from "../feedback/Feedback";


import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080/";

export default function UserContainer() {
  let data = useState("all");
  let checkCart = useState({ checkCart: false });
  let checkfeedBack = useState({ checkFeed: false });
  let cartItems = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("name")) {
      if (Cookies.get("name") === "admin") {
        navigate("/admin");
      } else if (Cookies.get("name") === "chef") {
        navigate("/chefpanel");
      }
    }else{
      navigate('/')
    }  
  });

  // socket.io code
  const socket = socketIOClient(ENDPOINT);
  socket.on("Message", data => {
    console.log(data)
    if(data.length>0){
      toast.info(data, {
        position: "top-left",
      });
    }
  });


  return (
    <feedbackContext.Provider value={checkfeedBack}>
      <CategoreyContext.Provider value={data}>
        <CheckCartContext.Provider value={checkCart}>
          <cartContext.Provider value={cartItems}>
            <div className="userContainer">
              <div className="filter">
                <Header />
                <Info />
                <Category />
                <CardContainer />
                <AddToCart />
                <ShowFeedback />
              </div>
            </div>
          </cartContext.Provider>
        </CheckCartContext.Provider>
      </CategoreyContext.Provider>
    </feedbackContext.Provider>
  );
}

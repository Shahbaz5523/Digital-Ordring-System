import React, { useEffect } from "react";
import "./CheifPanel.css";
import Header from "./Header/Header";
import OrderCard from "./OrderCard/OrderCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ChefPanel() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("name")) {
      if (Cookies.get("name") === "admin") {
        navigate("/admin");
      } else if (Cookies.get("name") === "chef") {
        console.log('Already there..!')
      }else{
          navigate('/userpanel')
      }
    } else {
      navigate("/");
    }
  });

  return (
    <div className="cheif-main">
      <Header />
      <OrderCard />
    </div>
  );
}

import "./Admin.css";
import React ,{useEffect} from "react";
import Header from "./Header/Header.jsx";
import SideBar from "./SideBar/SideBar.jsx";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("name")) {
      if (Cookies.get("name") === "admin") {
        console.log('Already there..!')
      } else if (Cookies.get("name") === "chef") {
        navigate("/chefpanel");
      }else{
          navigate('/userpanel')
      }
    } else {
      navigate("/");
    }
  });

  return (
    <div className="adminContainer">
      <Header />
      <div className="adminContent">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

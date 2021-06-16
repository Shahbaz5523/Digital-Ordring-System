import "./Header.css";
import React , {useState} from "react";
import {FaPowerOff} from 'react-icons/fa';
import {IoMdArrowDropdown} from 'react-icons/io';
import {useNavigate} from 'react-router-dom';
import admin from './man.svg';
import Cookies from 'js-cookie'


export default function Header() {
  const [toggle , setToggle] = useState(false);
  const ShowDropDown = () => setToggle(!toggle); 
  const navigate = useNavigate();

  
    // funtion to logout user and redirect to the home page
    const logoutUser = ()=>{
      navigate("/");
      Cookies.remove('name');
      Cookies.remove('token');
    }

  return (
    <div className="adminheader">
      <div>
        <img src="/pizza.png" alt="img not found" />
        <h1>Reception Panel</h1>
      </div>
      <div className="loginNav">
            <div className="userPic">
                <img src={admin}  alt="img not found" />
            </div>
            <p onClick={ShowDropDown}> 
              Admin <IoMdArrowDropdown style={{verticalAlign:'middle'}}/> 
            </p> 
            
            {/* dropdown for logout and changepassword display */}
            <div className={toggle ? 'dropDown-Show' : 'dropDown'}>
                <p onClick={logoutUser}> <FaPowerOff style={{color:'#333' , marginRight:"10px"}}/> Log Out</p>
            </div>
        </div>
    </div>
  );
}

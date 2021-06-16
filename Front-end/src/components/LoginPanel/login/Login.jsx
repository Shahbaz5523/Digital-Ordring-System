import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("name")) {
      if (Cookies.get("name") === "admin") {
        navigate("/admin");
      } else if (Cookies.get("name") === "chef") {
        navigate("/chefpanel");
      } else {
        navigate("/userpanel");
      }
    }
  });


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };
  // console.log(formData);

  const userAuth = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    axios
      .post("http://localhost:8080/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          // window.alert("signIn successfull");
          // console.log(res.data.data.token);
          // console.log("registration sucess");
          // navigate('/userpanel');
          toast.success("Sucessfull", {
            position: "top-left",
            autoClose: 5000,
          });
          if (res.data.data.username === "admin") {
            const token = res.data.data.token;
            const username = res.data.data.username;
            const inFifteenMinutes = new Date(
              new Date().getTime() + 60 * 60 * 1000
            );
            Cookies.set("name", username, { expires: inFifteenMinutes });
            Cookies.set("token", token, { expires: inFifteenMinutes });
            navigate("/admin");
          } else if (res.data.data.username === "chef") {
            const token = res.data.data.token;
            const username = res.data.data.username;
            const inFifteenMinutes = new Date(
              new Date().getTime() + 60 * 60 * 1000
            );
            Cookies.set("name", username, { expires: inFifteenMinutes });
            Cookies.set("token", token, { expires: inFifteenMinutes });
            navigate("/chefpanel");
          } else {
            const token = res.data.data.token;
            const tableName = res.data.data.username;
            const inFifteenMinutes = new Date(
              new Date().getTime() + 60 * 60 * 1000
            );
            Cookies.set("name", tableName, { expires: inFifteenMinutes });
            Cookies.set("token", token, { expires: inFifteenMinutes });
            navigate("/userpanel");
          }
        } else {
          toast.error("Unauthorized Success", {
            position: "top-left",
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        window.alert("invalid registration");
        console.log("invalid registration");
      });
  };

  return (
    <>
      <div className="login_box">
        <form method="POST" className="login_form" onSubmit={userAuth}>
          <h1>Welcome</h1>
          <div className="form-control">
            <input
              id="name"
              value={formData.tableName}
              name="username"
              type="text"
              required
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-control">
            <input
              id="pass"
              value={formData.password}
              name="password"
              type="password"
              required
              onChange={handleChange}
            />
            <label htmlFor="pass">Password</label>
          </div>
          <div className="form-control" style={{ textAlign: "center" }}>
            <button className="learn-more" type="submit">
              <span className="circle">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Login Now</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

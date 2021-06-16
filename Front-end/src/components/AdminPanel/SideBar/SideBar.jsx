import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

// import images
import orders from "./orders.svg";
import tables from "./table.svg";
import dishes from "./dishes.svg";
import feedback from "./feedback.svg";
import Report from "./report.svg";

const SideBar = () => {
  return (
    <div className="adminwrapper">
      <div className="adminsidebar">
        <Link to="/admin/">
          <img src={orders} alt="Orders" />
          <div>Orders</div>
        </Link>
        <Link to="/admin/report">
          <img src={Report} alt="Report" />
          <div>Report</div>
        </Link>
        <Link to="/admin/addtables">
          <img src={tables} alt="Add Table" />
          <div className="table">Add Table</div>
        </Link>
        <Link to="/admin/adddishes">
          <img src={dishes} alt="Add Dishes" />
          <div className="dishes">Add Dishes</div>
        </Link>
        <Link to="/admin/feedback">
          <img src={feedback} alt="User Feedback" />
          <div className="reviews">Feedback</div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;

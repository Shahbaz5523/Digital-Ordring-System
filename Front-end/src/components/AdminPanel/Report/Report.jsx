import "./Report.css";
import { CSVLink } from "react-csv";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";

const TabStyle = {
  fontFamily: "Arial",
  fontWeight: "600",
  color: "#333",
};

const Report = () => {
  const [allorders, setAllOrders] = useState([]);
  const [todaysOrders, settodaysOrders] = useState([]);
  const [selectedDateOrders, setSelectedDateOrders] = useState([]);
  const [date, setDate] = useState("");
  const [data, setData] = useState("");

  async function getAllOredrs() {
    try {
      const response = await axios.get("/getallorders");
      setAllOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  const getAllReport = () => {
    setData("");
    setData(
      allorders.map((i, index) => {
        let dishes = i.totalOrder.map((dish, ind) => {
          return dish.name + ",";
        });
        return {
          Table_No: i.tableNo,
          Date: i.date,
          Total_Orders: dishes,
          Total: i.total,
        };
      })
    );
  };

  async function gettodaysorders() {
    try {
      const response = await axios.get("/gettodaysorders");
      settodaysOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  const getTodayReport = () => {
    setData("");

    setData(
      todaysOrders.map((i, index) => {
        let dishes = i.totalOrder.map((dish, ind) => {
          return dish.name + ",";
        });
        return {
          Table_No: i.tableNo,
          Date: i.date,
          Total_Orders: dishes,
          Total: i.total,
        };
      })
    );
  };

  const getDate = (e) => {
    let aa = e.target.value;
    let year = aa.slice(0, 4);
    let month = aa.slice(5, 7);
    let day = aa.slice(8, 10);
    const today = new Date(),
      time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    if (year > today.getFullYear()) {
      console.log("please enter valid date");
      toast.error("please enter valid date", {
        position: "top-left",
      });
      e.target.value = "";
      setDate("");
      setSelectedDateOrders([]);
    } else if (month > today.getMonth() + 1) {
      console.log("please enter valid date");
      toast.error("please enter valid date", {
        position: "top-left",
      });
      setDate("");
      e.target.value = "";
      setSelectedDateOrders([]);
    } else if (day > today.getDate()) {
      console.log("please enter valid date");
      toast.error("please enter valid date", {
        position: "top-left",
      });
      setDate("");
      e.target.value = "";
      setSelectedDateOrders([]);
    } else {
      setDate(e.target.value);
    }
  };

  const getDataOfSelectedDate = async (e) => {
    try {
      const response = await axios.post("/getselecteddateorder", { date });
      setSelectedDateOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSpecificReport = () => {
    setData("");
    setData(
      selectedDateOrders.map((i, index) => {
        let dishes = i.totalOrder.map((dish, ind) => {
          return dish.name + ",";
        });
        return {
          Table_No: i.tableNo,
          Date: i.date,
          Total_Orders: dishes,
          Total: i.total,
        };
      })
    );
  };
  useEffect(() => {
    getAllOredrs();
    gettodaysorders();
    getDataOfSelectedDate();
  }, [allorders]);

  return (
    <div className="reportContainer">
      <Tabs>
        <TabList>
          <Tab style={TabStyle}>Todays Orders</Tab>
          <Tab style={TabStyle}>All Orders</Tab>
          <Tab style={TabStyle}>Specific Date</Tab>
        </TabList>

        <TabPanel>
          {/* THIS TAB CONTAIN TODAYS ORDERS */}
          <div style={{ margin: "20px 0px" }}>
            <div className="datepicker">
              <h3>Todays list:</h3>
              <CSVLink data={data} filename="TodaysReport.csv">
                <button
                  disabled={todaysOrders.length !== 0 ? false : true}
                  onClick={getTodayReport}
                  className="reportBtn"
                >
                  Get Report
                </button>
              </CSVLink>
            </div>
            <table className="adminTable" cellSpacing="8">
              <thead>
                <tr className="admintableheader">
                  <th>Date</th>
                  <th>Table no</th>
                  <th>Order</th>
                  <th>Total Bill</th>
                </tr>
              </thead>
              <tbody className="adminTbody">
                {/* here comes dummy data */}
                {todaysOrders.map((order, index) => {
                  let menuss = "";
                  let dishes = "";
                  return (
                    <tr key={order._id}>
                      <td>{order.date}</td>
                      <td>{order.tableNo}</td>
                      <td>
                        {order.totalOrder.map((menu) => {
                          dishes = menuss + menu.name + " , ";
                          return dishes;
                        })}
                      </td>
                      <td>{order.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabPanel>

        <TabPanel>
          {/* THIS TAB CONTAIN ALL ORDERS */}
          <div style={{ margin: "20px 0px" }}>
            <div className="datepicker">
              <h3>All list:</h3>
              <CSVLink autoCapitalize data={data} filename="TotalReport.csv">
                <button
                  disabled={allorders.length !== 0 ? false : true}
                  onClick={getAllReport}
                  className="reportBtn"
                >
                  Get Report
                </button>
              </CSVLink>
            </div>

            <table className="adminTable" cellSpacing="8">
              <thead>
                <tr className="admintableheader">
                  <th>Date</th>
                  <th>Table no</th>
                  <th>Order</th>
                  <th>Total Bill</th>
                </tr>
              </thead>
              <tbody className="adminTbody">
                {/* here comes dummy data */}
                {allorders.map((order, index) => {
                  let menuss = "";
                  let dishes = "";
                  return (
                    <tr key={order._id}>
                      <td>{order.date}</td>
                      <td>{order.tableNo}</td>
                      <td>
                        {order.totalOrder.map((menu) => {
                          dishes = menuss + menu.name + " , ";

                          return dishes;
                        })}
                      </td>
                      <td>{order.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabPanel>

        <TabPanel>
          {/* THIS TAB CONTAIN SPECIFIC DATE ORDERS */}
          <div className="datepicker" style={{ marginTop: "20px" }}>
            <h3>Selected list:</h3>
            <div>
              <input id="date" type="date" onChange={getDate} />
              <CSVLink data={data} filename="specificDate.csv">
                <button
                  disabled={selectedDateOrders.length !== 0 ? false : true}
                  onClick={getSpecificReport}
                  className="reportBtn"
                >
                  Get Report
                </button>
              </CSVLink>
            </div>
          </div>
          <div style={{ margin: "0px 0px 20px 0px" }}>
            <table className="adminTable" cellSpacing="8">
              <thead>
                <tr className="admintableheader">
                  <th>Date</th>
                  <th>Table no</th>
                  <th>Order</th>
                  <th>Total Bill</th>
                </tr>
              </thead>
              <tbody className="adminTbody">
                {/* here comes dummy data */}
                {selectedDateOrders.map((order, index) => {
                  let menuss = "";
                  let dishes = "";
                  return (
                    <tr key={order._id}>
                      <td>{order.date}</td>
                      <td>{order.tableNo}</td>
                      <td>
                        {order.totalOrder.map((menu) => {
                          dishes = menuss + menu.name + " , ";

                          return dishes;
                        })}
                      </td>
                      <td>{order.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Report;

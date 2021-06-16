import React, { useState, useEffect } from "react";
import "./Bills.css";
import axios from "axios";

const Bills = () => {
  const [orders, setOrders] = useState([]);

  async function getOredrs() {
    try {
      const response = await axios.get("/receptionorder");
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOredrs();
  }, [orders]);


  const deleteOrder = (e) =>{
    console.log(e.currentTarget.getAttribute('tid'));
    console.log(e.currentTarget.getAttribute('total'));
    console.log(e.currentTarget.getAttribute('date'));
    console.log(e.currentTarget.getAttribute('time'));
    console.log(e.currentTarget.getAttribute('order'));

    const tableName = e.currentTarget.getAttribute('tid');


    axios.post('/deleteOrderfromReception' , {
      tableName
    })
    .then((res) => {
                
      console.log("hello");
      

  })
  .catch((err) => {
      console.log(err.response);

  });


  }

  return (
    <div className="tabeleContainer">
      <table className="adminTable" cellSpacing="6">
        <thead>
          <tr className="admintableheader">
            <th>Date</th>
            <th>Table no</th>
            <th>Order</th>
            <th>Total Bill</th>
            <th>Time of odder</th>
            <th>CheckOut</th>
          </tr>
        </thead>
        <tbody className="adminTbody">
          {orders.map((order, index) => {
            let menuss = "";
            let dishes = "";
            let totalprice = 0;

            return (
              <tr>
                <td>{order.date}</td>
                <td>{order.tableNo}</td>
                <td>
                  {order.totalOrder.map((menu) => {
                    dishes = menuss + menu.name + " , ";

                    return dishes;
                  })}
                </td>
                <td>
                  {order.totalOrder.map((menu, index) => {
                    let lastindex = order.totalOrder.length;

                    totalprice += menu.itemPrice;

                    if (index + 1 === lastindex) {
                      return totalprice;
                    }
                  })}
                </td>
                <td>{order.time}</td>
                <td>
                  <button onClick={(e)=>{deleteOrder(e)}} 
                  tid={order.tableNo} 
                  total={order.total}
                  date={order.date}
                  time={order.time}
                  order={dishes}   >
                    
                    <i class="far fa-file-alt"></i> Generate
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Bills;

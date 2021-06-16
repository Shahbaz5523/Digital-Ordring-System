import './AddToCart.css';
import React, { useContext , useState , useEffect } from 'react';
import CheckCartContext from '../../Context/CheckCartContext';
import cartContext from '../../Context/cartContext';
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';




const AddToCart = () => {
    const [name, setname] = useState("")
   
    useEffect(() => {
        setname( Cookies.get("name"))
         
     }, [])
    
    let classNames = ['cart'];

    const checkCart = useContext(CheckCartContext);
    const cartItems = useContext(cartContext);

    // show and hide cart
    if (checkCart[0].checkCart === true) {
        classNames.push('showCart');
    } else {
        classNames.push('hideCart');
    }

    const hideCart = () => {
        checkCart[1]({ checkCart: false });
    }

    // total calculator
    let total = 0;
    cartItems[0].forEach((item) => {
        total = total + (item.itemPrice * item.itemQty);
    });

    // function for delete a item from cart
    const delItem = (i) => {
        const newData = [];
        cartItems[0].forEach((item, index) => {
            if (index !== i) {
                newData.push(item);
            }
        })
        cartItems[1](newData);
    }

    const getData = async (e) => {
        e.preventDefault();
        const totalOrder = cartItems[0]
        const tableNo = name;
        // const tableNo = 15;
        const today = new Date(),
      
        

        

         time = `${today.getHours()}:${ today.getMinutes()}:${today.getSeconds()}`;
        let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
         //   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
         if(`${today.getMonth() + 1}` < 10 && `${today.getDate()}` < 10 ){
             date = `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`
         }
         if(`${today.getMonth() + 1}` < 10 && `${today.getDate()}` > 9 ){
            date = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`

         }
        
        console.log(time);
        console.log(date);
        


   
        console.log(totalOrder);

        axios
            .post('http://localhost:8080/addorder', {
                tableNo,
                total,
                totalOrder,
                date,
                time
            })
            .then((res) => {
                // console.log(res.data);
                toast.info(res.data.message);
                console.log(res.data.message);
                // Hide cart and set to empty when submited
                hideCart();
                cartItems[1]([]);
            })
            .catch((err) => {
                console.log(err.response);
                toast.error(err.response.data.error);


            });


    }
    return (
        <div className={classNames.join(' ')}>

            <div className="carthead">
                <span>Cart Items</span>
            </div>
            <div className="closeContainer" onClick={hideCart}><img src="/delete.ico" alt="close" /></div>

            <table>
                <thead>
                    <tr className="headings">
                        <th>Item</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems[0].map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.itemSize}</td>
                                    <td>{item.itemQty}</td>
                                    <td>{item.itemPrice}</td>
                                    <td>{item.itemQty * item.itemPrice}</td>
                                    <td><button className="del" onClick={() => delItem(index)}>X</button></td>
                                </tr>
                            );
                        })
                    }
                    <tr>
                        <td>
                            <p><strong>Total Bill is&nbsp;</strong> RS:{total}</p>
                        </td>
                        <td colSpan='4'></td>
                        <td>
                            <button className="checkout" onClick={getData}><i className="fa fa-shopping-cart" aria-hidden="true"></i> Check Out</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default AddToCart;
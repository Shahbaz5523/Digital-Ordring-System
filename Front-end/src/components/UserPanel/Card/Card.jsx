import './Card.css';
import {useState , useContext } from 'react';
import cartContext from '../../Context/cartContext';

export default function Card(props) {
    let [qty , setQty] = useState(1);
    let [size , setSize] = useState(props.type==='drink' ? 'r' : 's');
    
    const cartItems = useContext(cartContext);

    // function for increase qty
    const increaseQty = ()=> setQty(++qty);

    // function for decrease qty
    const decreaseQty = () => {
        if(qty !== 1){
            setQty(--qty);
        }
    } 

    // get Size
    const getSize = sizeValue =>{
        setSize(sizeValue);
    }

    // add to cart function
    let itemData = {
        name : props.name,
        itemSize : size,
        itemQty : qty,
        itemPrice : size==='s' || size==='r' ? props.sPrice : size==='m' || size==="h" ? props.mPrice : props.lPrice
    }
    const addToCart = (e)=>{
        cartItems[1]([...cartItems[0],itemData]);
    }


    // const paths = `http://localhost:8080/${props.img}`
    return (
        <div className="card">
            <img className="img" src={props.img}  id={props.type === 'drink' ? 'drink' : ''}  alt="food"/>
            <h2>{props.name}</h2>
            <p className="ingredients">{props.ingre}</p>
            <p className="price"> <img style={{width:'17px', verticalAlign:'middle'}} src="./pakistan-rupee-currency-symbol.svg" alt="RS"/> <span>{size==='s' || size==='r' ? props.sPrice : size==='m' || size==="h" ? props.mPrice : props.lPrice}</span></p>
            <div className="options">
                <div className="qty">
                    <h3>Quantity</h3>
                    <div>
                        <button onClick={decreaseQty}> - </button>
                        <span> {qty} </span>
                        <button onClick={increaseQty}> + </button>
                    </div>
                </div>
                <div className="size">
                   <h3>Size</h3>
                   <div>
                       <button onClick={()=>{
                        //    set state
                           if(props.type === 'drink'){
                                getSize('r');
                           }else{
                                getSize('s');
                           }
                       }} className={size==='s' ? 'selected' : size==='r' ? 'selected' : ''}> {props.type === 'drink' ? 'R' : 'S'} </button>

                       <button onClick={()=>{
                           if(props.type === 'drink'){
                                getSize('h');
                            }else{
                                getSize('m');
                            }
                       }} className={size==='m' ? 'selected' : size==='h' ? 'selected' : ''} > {props.type === 'drink' ? 'H' : 'M'} </button>

                       <button onClick={()=>{
                           getSize('l');
                       }} className={size==='l' ? 'selected' : ''}>L</button>
                   </div>
                </div>
            </div>
            <button className="addToCart" onClick={addToCart}> <img src="shopping-cart.svg" alt="cart"/> <span>Add to Cart</span></button>
        </div>
    )
}

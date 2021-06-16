import React, { useEffect, useState } from "react";
import "./CardContainer.css";

import axios from 'axios'


// import components
import Card from "../Card/Card";


export default function AllCards() {

  const [pizzas, setPizzas] = useState([])
  const [specialPizzas, setSpecialPizzas] = useState([])
  const [drinks, setDrinks] = useState([])

  async function fetchPizza() {

    try {
      const response = await axios.get('/getpizza');

      setPizzas(response.data.data)


    } catch (error) {
      console.error(error);
    }
  }
  async function fetchSpecialPizza() {

    try {
      const response = await axios.get('/getspecialpizza');

      setSpecialPizzas(response.data.data)


    } catch (error) {
      console.error(error);
    }
  }


  async function fetchDrink() {

    try {
      const response = await axios.get('/getdrink');

      setDrinks(response.data.data)

    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {


    fetchPizza()
    fetchSpecialPizza()
    fetchDrink()

  }, []);




  return (
    <>
      <fieldset>
        <legend>Pizza</legend>
        {pizzas.map((pizza, index) => {
          return (
            <Card
              name={pizza.dishName}
              ingre={pizza.dishIngri}
              img={pizza.secureUrl}
              sPrice={pizza.priceForSmall}
              mPrice={pizza.priceForMedium}
              lPrice={pizza.priceForLarge}
              key={index}
            />
          );
        })}
      </fieldset>
      <fieldset>
        <legend>Special Pizza</legend>
        {specialPizzas.map((pizza, index) => {
          return (
            <Card
              name={pizza.dishName}
              ingre={pizza.dishIngri}
              img={pizza.secureUrl}
              sPrice={pizza.priceForSmall}
              mPrice={pizza.priceForMedium}
              lPrice={pizza.priceForLarge}
              key={index}
            />
          );
        })}
      </fieldset>
      <fieldset>
        <legend>Drinks</legend>
        {drinks.map((drink, index) => {
          return (
            <Card
              type="drink"
              name={drink.drinkName}
              // ingre={drink.ingridients}
              img={drink.secureUrl}

              sPrice={drink.priceForRegular}
              mPrice={drink.priceForHalf}
              lPrice={drink.priceForLiter}
              key={index}
            />
          );
        })}
      </fieldset>
    </>
  );
}

import React, {useEffect , useState}   from "react";
import "./CardContainer.css";
import axios from 'axios'
import Card from "../Card/Card";

export default function Pizzas() {
  const [pizzas, setPizzas] = useState([])

  async function fetchPizza() {

    try {
      const response = await axios.get('/getpizza');

      setPizzas(response.data.data)


    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {


    fetchPizza()

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
    </>
  );
}

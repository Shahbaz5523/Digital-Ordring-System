import React, {useEffect , useState} from "react";
import "./CardContainer.css";
import axios from 'axios'


// import components
import Card from "../Card/Card";

export default function Special() {
  const [specialPizzas, setSpecialPizzas] = useState([])


  async function fetchSpecialPizza() {

    try {
      const response = await axios.get('/getspecialpizza');

      setSpecialPizzas(response.data.data)


    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {


    
    fetchSpecialPizza()
    

  }, []);
  return (
    <>
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
    </>
  );
}

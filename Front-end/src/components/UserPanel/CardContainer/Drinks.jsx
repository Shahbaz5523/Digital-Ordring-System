import React , {useEffect , useState}  from "react";
import "./CardContainer.css";
import axios from 'axios'
import Card from "../Card/Card";




export default function Drinks() {
  const [drinks, setDrinks] = useState([])


  async function fetchDrink() {

    try {
      const response = await axios.get('/getdrink');

      setDrinks(response.data.data)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {


    
    fetchDrink()

  }, []);
  

  
  return (
    <>
      <fieldset>
        <legend>Drinks</legend>
        {drinks.map((drink, index) => {
          return (
            <Card
              type="drink"
              name={drink.drinkName}
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

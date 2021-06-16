import React, { useContext } from "react";
import "./CardContainer.css";
import AllCard from './AllCards';
import Pizzas from './Pizzas';
import Special from './Special';
import Drinks from './Drinks';

import categoryContext from "../../Context/CategoryContex";

export default function CardContainer() {
  
  const type = useContext(categoryContext);
  const cards = type[0] === 'all' ? <AllCard/> : type[0]==='Pizza' ? <Pizzas/> : type[0]==='Special' ? <Special/> : <Drinks/>; 

  return(
    <div className="cardContainer">
      {cards}
    </div>
  );
}

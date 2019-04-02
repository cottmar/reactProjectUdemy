import React from 'react';
import classes from './Burger.module.css';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients)
  .map(igKey => {
    //if we have two cheese ingredients, we want to turn the element into an array?
    return [...Array(props.ingredients[igKey])].map((_, i) => {
     return  <BurgerIngredient key={igKey + i} type={igKey} /> // this is getting the key values
    });
  });
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
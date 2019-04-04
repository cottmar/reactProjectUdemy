import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
  .map(igKey => {
    //if we have two cheese ingredients, we want to turn the element into an array?
    return [...Array(props.ingredients[igKey])].map((_, i) => {
     return  <BurgerIngredient key={igKey + i} type={igKey} /> // this is getting the key values
    });
  })
  .reduce((arr, el) => {
    return arr.concat(el)
  }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
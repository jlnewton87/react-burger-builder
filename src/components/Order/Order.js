import React from 'react';

import classes from './Order.css';

import {
  getPrice,
  stringifyIngredients
} from '../../utils';

const order = (props) => {
  const { ingredients } = props;
  return (
    <div className={classes.Order}>
      <p>Ingredients: { stringifyIngredients(ingredients) }</p>
      <p>Price: <strong>{ `$${getPrice(ingredients).toFixed(2)}` }</strong></p>
    </div>
  );
};

export default order;
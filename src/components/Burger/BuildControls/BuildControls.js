import React from 'react';
import _ from 'lodash';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>${props.currentPrice.toFixed(2)}</p>
      { _.map(controls, (control) => (
        <BuildControl
          key={ control.label }
          label={ control.label }
          add={() => props.addIngredientHandler(control.type)}
          remove={() => props.removeIngredientHandler(control.type)} />
      )) }
      <button className={classes.OrderButton} disabled={!props.canOrder}>ORDER NOW</button>
    </div>
  );
};

export default buildControls;
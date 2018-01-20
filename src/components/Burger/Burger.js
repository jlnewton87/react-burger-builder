import React from 'react';
import _ from 'lodash';
import FA from 'react-fontawesome';

import classes from './Burger.css';
// import Aux from '../../hoc/Aux/Aux';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let increment = 0;
  const ingredients = _.reduce(props.ingredients, (output, v, k) => {
    _.times(v, () => output.push(
      <BurgerIngredient
        key={ k + v + increment++ }
        type={k} />
    ));
    return output;
  }, []);

  const messageClass = ingredients.length === 0 ? classes.Message : classes.hide; // 1 hide

  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type='bread-top' />
      <h1 className={messageClass}><FA name="times-circle-o" style={{ color: 'red' }} /> Pick Some Toppings!</h1>
      { ingredients }
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
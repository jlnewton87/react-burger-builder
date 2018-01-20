import React from 'react';
import _ from 'lodash';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const ingredients = _.reduce(props.ingredients, (output, v, k) => {
    _.times(v, () => output.push(
      <BurgerIngredient
        key={ output.length + v + output.length }
        type={k} />
    ));
    return output;
  }, []);
  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type='bread-top' />
      { ingredients }
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
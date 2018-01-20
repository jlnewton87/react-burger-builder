import React, { Component } from 'react'
import _ from 'lodash';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const ingredientPrices = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
};

const ACTIONS = {
  add: 'ADD',
  remove: 'REMOVE'
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4
  };

  ingredientResult = (ingredients, price) => {
    return {ingredients, totalPrice: price}
  }

  updateIngredientCount = (count, action) => {
    return action === ACTIONS.add ?
      count === 5 ? 5 : count + 1 :
      count === 0 ? 0 : count - 1;
  }

  updateIngredient = (action, ingType) => {
    let newIngredients = _.clone(this.state.ingredients);
    newIngredients[ingType] = this.updateIngredientCount(newIngredients[ingType], action);
    const updatedPrice = this.state.totalPrice + ingredientPrices[ingType];
    this.setState(this.ingredientResult(newIngredients, updatedPrice));
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          addIngredientHandler={_.partial(this.updateIngredient, ACTIONS.add)}
          removeIngredientHandler={_.partial(this.updateIngredient, ACTIONS.remove)} />
      </Aux>
    )
  }
}

export default BurgerBuilder;
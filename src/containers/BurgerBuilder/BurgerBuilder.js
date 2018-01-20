import React, { Component } from 'react'
import _ from 'lodash';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  base: 4,
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
    totalPrice: 0
  };

  ingredientResult = (ingredients, price) => {
    // used to hash result as input to `setState`
    return {ingredients, totalPrice: price}
  }

  updateIngredientCount = (count, action) => {
    // add or remove ingredient keeping
    // min 0 and max 5
    return action === ACTIONS.add ?
      count === 5 ? 5 : count + 1 :
      count === 0 ? 0 : count - 1;
  }

  getPrice = (ingredients) => {
    // updates price based on ingredient list
    const priceList = INGREDIENT_PRICES;
    return priceList.base + _.reduce(ingredients, (output, count, name) => {
      return output += priceList[name] * count;
    }, 0);
  }

  updateIngredient = (action, ingType) => {
    //takes an action and ingredient type to update state
    let newIngredients = _.clone(this.state.ingredients);
    newIngredients[ingType] = this.updateIngredientCount(newIngredients[ingType], action);
    this.setState(
      this.ingredientResult(newIngredients, this.getPrice(newIngredients))
    );
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          addIngredientHandler={_.partial(this.updateIngredient, ACTIONS.add)}
          removeIngredientHandler={_.partial(this.updateIngredient, ACTIONS.remove)} />
        <h1>${parseFloat(this.state.totalPrice).toFixed(2)}</h1>
      </Aux>
    )
  }
}

export default BurgerBuilder;
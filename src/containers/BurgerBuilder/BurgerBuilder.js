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

  addIngredient = (type) => {
    let newIngredients = _.clone(this.state.ingredients);
    const newCount = newIngredients[type] + 1;
    newIngredients[type] = newCount;
    const updatedPrice = this.state.totalPrice + ingredientPrices[type];
    this.setState({ingredients: newIngredients, totalPrice: updatedPrice});
  }

  removeIngredient = (type) => {
    let newIngredients = _.clone(this.state.ingredients);
    const newCount = newIngredients[type] - 1;
    newIngredients[type] = newCount;
    const updatedPrice = this.state.totalPrice - ingredientPrices[type];
    this.setState({ingredients: newIngredients, totalPrice: updatedPrice});
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          addIngredientHandler={this.addIngredient}
          removeIngredientHandler={this.removeIngredient} />
      </Aux>
    )
  }
}

export default BurgerBuilder;
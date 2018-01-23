import React, { Component } from 'react'
import _ from 'lodash';

import {
  ACTIONS,
  updateIngredientCount,
  getPrice,
  ingredientResult,
  getCanCheckout
} from '../../utils';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    canCheckout: false
  };

  updateIngredient = (action, ingType) => {
    //takes an action and ingredient type to update state
    let newIngredients = _.clone(this.state.ingredients);
    newIngredients[ingType] = updateIngredientCount(newIngredients[ingType], action);
    this.setState(
      ingredientResult(
        newIngredients,
        getPrice(newIngredients),
        getCanCheckout(newIngredients)
      )
    );
  }

  render() {
    return (
      <Aux>
        <Modal>
          <OrderSummary
            order={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          currentPrice={this.state.totalPrice}
          addIngredientHandler={_.partial(this.updateIngredient, ACTIONS.add)}
          removeIngredientHandler={_.partial(this.updateIngredient, ACTIONS.remove)}
          canOrder={this.state.canCheckout} />
      </Aux>
    )
  }
}

export default BurgerBuilder;
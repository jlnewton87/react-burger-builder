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
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {

  state = {
    ingredients: {

    },
    totalPrice: 4,
    canCheckout: false,
    goingToCheckout: false,
    loading: false
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

  continueToCheckout = () => this.setState({goingToCheckout: true})

  cancelModal = () => this.setState({goingToCheckout: false})

  goToCheckout = () => {
    //alert(`you checked out`);
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Some Body',
        address: {
          street: '555 Some Place',
          zip: '33333',
          country: 'US'
        },
        email: 'test@testing.co'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then( response => {
        this.setState({ loading: false, goingToCheckout: false });
      } )
      .catch( err => {
        this.setState({ loading: false, goingToCheckout: false });
      } );
  }

  componentDidMount () {
    axios.get('https://burgerbuilder-92e93.firebaseio.com/ingredients.json')
      .then( resp => {
        const { data: ingredients } = resp;
        this.setState({ingredients});
      } );
  }

  render () {
    const modalBody = !this.state.loading ?
      <OrderSummary
        cancelCheckout={this.cancelModal}
        order={this.state.ingredients}
        continue={this.goToCheckout} /> :
      <Spinner />;

    return (
      <Aux>
        <Modal
          show={this.state.goingToCheckout}
          close={this.cancelModal} >
          { modalBody }
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          currentPrice={this.state.totalPrice}
          addIngredientHandler={_.partial(this.updateIngredient, ACTIONS.add)}
          removeIngredientHandler={_.partial(this.updateIngredient, ACTIONS.remove)}
          canOrder={this.state.canCheckout}
          goToCheckout={this.continueToCheckout} />
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
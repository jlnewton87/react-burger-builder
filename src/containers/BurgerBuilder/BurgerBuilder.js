import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import actions from '../../store/reducers/actions';

import {
  INGREDIENT_ACTIONS,
  updateIngredientCount,
  getPrice,
  getCanCheckout,
  toBase64
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
    goingToCheckout: false,
    loading: false
  };

  updateIngredient = (action, ingType) => {
    //takes an action and ingredient type to update state
    let newIngredients = _.clone(this.props.burger.ingredients);
    newIngredients[ingType] = updateIngredientCount(newIngredients[ingType], action);
    this.props.updateBurgerHandler(newIngredients, getPrice(newIngredients))
  }

  canOrder = () => getCanCheckout(this.props.burger.ingredients)

  continueToCheckout = () => this.setState({goingToCheckout: true})

  cancelModal = () => this.setState({goingToCheckout: false})

  goToCheckout = () => this.props.history.push(`/checkout`)

  componentDidMount () {
    axios.get('https://burgerbuilder-92e93.firebaseio.com/ingredients.json')
      .then( resp => {
        let { data: {salad, bacon, cheese, meat} } = resp;
        const ingredients = {
          salad,
          bacon,
          cheese,
          meat
        };
        this.props.updateIngredientsHandler(ingredients);
      } )
      .catch( err => {
        console.log(err);
      });
  }

  render () {
    const modalBody = !this.state.loading ?
      <OrderSummary
        cancelCheckout={this.cancelModal}
        order={this.props.burger.ingredients}
        continue={this.goToCheckout} /> :
      <Spinner />;

    return (
      <Aux>
        <Modal
          show={this.state.goingToCheckout}
          close={this.cancelModal} >
          { modalBody }
        </Modal>
        <Burger ingredients={this.props.burger.ingredients}/>
        <BuildControls
          currentPrice={this.props.burger.price}
          addIngredientHandler={_.partial(this.updateIngredient, INGREDIENT_ACTIONS.add)}
          removeIngredientHandler={_.partial(this.updateIngredient, INGREDIENT_ACTIONS.remove)}
          canOrder={this.canOrder()}
          goToCheckout={this.continueToCheckout} />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    burger: state.burger
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateIngredientsHandler: (ingredients) => dispatch({ type: actions.UPDATE_INGREDIENTS, value: ingredients }),
    updateBurgerHandler: (ingredients, price) => dispatch({ type: actions.UPDATE_BURGER, value: { ingredients, price } })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
import React, { Component } from 'react';
import { basicQueryStringDecoder, fromBase64 } from '../../utils';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1
    }
  }

  componentWillMount() {
    this.updateIngredientState();
  }

  componentWillReceiveProps = (nextProps) => {
    this.updateIngredientState();
  }


  goBack = () => {
    this.props.history.goBack();
  }

  continueOrder = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  updateIngredientState(nextProps) {
    const ingredients = JSON.parse(this.getIngredients(nextProps));
    this.setState({ingredients});
  }

  getIngredients(nextProps) {
    const qs = nextProps ? nextProps.location.search : this.props.location.search;
    const encodedIngredients = basicQueryStringDecoder(qs)['ing'];
    return fromBase64(encodedIngredients);
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          backToBuilder={this.goBack}
          continueOrder={this.continueOrder}/>
      </div>
    );
  }
}
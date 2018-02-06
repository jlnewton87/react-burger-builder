import React, { Component } from 'react';
import { basicQueryStringDecoder, fromBase64 } from '../../utils';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1
    }
  }

  componentWillMount() {
    this.updateIngredientState();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  continueOrder = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  updateIngredientState(nextProps) {
    const ingredients = this.getIngredients(nextProps);
    this.setState({ingredients});
  }

  getIngredients(nextProps) {
    const qs = nextProps ? nextProps.location.search : this.props.location.search;
    if (!qs) {
      return {};
    }
    const encodedIngredients = basicQueryStringDecoder(qs)['ing'];
    return JSON.parse(fromBase64(encodedIngredients));
  }

  render() {
    const summary = (
      <CheckoutSummary
        ingredients={this.state.ingredients}
        backToBuilder={this.goBack}
        continueOrder={this.continueOrder}/>
    );
    const redirect = <Redirect to="/" />
    const display = this.state.ingredients.meat ? summary : redirect;
    return (
      <div>
        {display}
        <Route path={`${this.props.match.path}/contact-data`} render={() => <ContactData ingredients={this.state.ingredients} />} />
      </div>
    );
  }
}
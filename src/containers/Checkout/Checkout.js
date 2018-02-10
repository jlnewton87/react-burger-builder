import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTotalIngredientCount } from '../../utils';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  goBack = () => {
    this.props.history.goBack();
  }

  continueOrder = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        {
          getTotalIngredientCount(this.props.burger.ingredients) === 0 ?
            <Redirect to='/' /> :
            null
        }
        <CheckoutSummary
          ingredients={this.props.burger.ingredients}
          backToBuilder={this.goBack}
          continueOrder={this.continueOrder}/>
        <Route path={`${this.props.match.path}/contact-data`} render={(props) => <ContactData ingredients={this.props.burger.ingredients} {...props} />} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    burger: state.burger
  };
}

export default connect(mapStateToProps, null)(Checkout);
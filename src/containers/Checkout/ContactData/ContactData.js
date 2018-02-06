import React, { Component } from 'react';

import { getPrice } from '../../../utils';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

export default class ContactData extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    address: {
      country: '',
      street: '',
      zip: ''
    }
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: getPrice(this.props.ingredients),
      customer: {
        name: this.state.name,
        address: {
          street: this.state.street,
          zip: this.state.zip,
          country: 'US'
        },
        email: this.state.email
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then( response => {
        this.setState({ loading: false });
      } )
      .catch( err => {
        this.setState({ loading: false });
      } );
  }

  render () {
    return (
      <div className={classes.ContactData}>
        <h4>Enter you info</h4>
        <form>
          <input type="text" name="name" placeholder="your name" />
          <input type="text" name="email" placeholder="your email" />
          <input type="text" name="street" placeholder="your street" />
          <input type="text" name="zip" placeholder="your zip" />
          <Button type="success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
}
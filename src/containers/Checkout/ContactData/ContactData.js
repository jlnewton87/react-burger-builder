import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

export default class ContactData extends Component {
  state = {
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
    console.log(this.props.ingredients);
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
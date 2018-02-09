import React, { Component } from 'react';
import { map, cloneDeep, assign } from 'lodash';

import { getPrice, getOrderForm } from '../../../utils';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner';
import Aux from '../../../hoc/Aux/Aux';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {
  state = {
    loading: false,
    orderForm: getOrderForm()
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: getPrice(this.props.ingredients)
    };
    const orderWithFormData = assign(order, this.getOrderFormValues(this.state.orderForm))

    axios.post('/orders.json', orderWithFormData)
      .then( response => {
        this.setState({ loading: false });
        this.props.history.replace('/');
      } )
      .catch( err => {
        this.setState({ loading: false });
      } );
  }

  getOrderFormValues = (form) => {
    const formValues = map(form, (val, key) => {
      let output = {};
      output[key] = val.value;
      return output;
    }).reduce((output, field) => {
      assign(output, field);
      return output;
    });
    let { deliveryMethod, ...customer } = formValues;
    return assign({}, { deliveryMethod }, { customer });
  }

  inputChangeHandler = (event, key) => {
    let orderForm = cloneDeep(this.state.orderForm);
    orderForm[`${key}`].value = event.target.value;
    this.setState({ orderForm });
  }

  render () {
    const form = (
      <Aux>
        <h4>Enter you info</h4>
        <form>
          {map(this.state.orderForm, (input, key) => {
            return <Input
              changed={(event) => this.inputChangeHandler(event, key)}
              key={key}
              {...input}/>
          })}
          <Button type="success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </Aux>
    );
    const spinner = <Spinner />;
    const display = this.state.loading ? spinner : form;
    return (
      <div className={classes.ContactData}>
        {display}
      </div>
    );
  }
}
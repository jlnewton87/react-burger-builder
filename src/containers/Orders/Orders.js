import React, { Component } from 'react';
import _ from 'lodash';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner';

export default class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    message: 'No orders yet'
  }

  componentDidMount () {
    axios.get('/orders.json')
      .then( res => {
        let { data: rawOrders } = res;
        const orders = _.map(rawOrders, (order, orderId) => {
          let output = { ...order };
          output.id = orderId;
          return output;
        });
        this.setState({ loading: false, orders })
      })
      .catch( err => {
        const message = `could not receive orders (${err})`;
        this.setState({ loading: false, message })
      });
  }

  mapOrders (order) {
    return (
      <Order key={order.id} ingredients={order.ingredients} />
    );
  }

  render () {
    const { loading, orders, message } = this.state;
    let display = loading ?
      <Spinner /> :
      orders && orders.length > 0 ?
        _.map(orders, this.mapOrders) :
        <h2 style={{ textAlign: 'center' }}>{ message }</h2>;
    return (
      <div>
        { display }
      </div>
    );
  }
}
import React, { Component } from 'react';
import _ from 'lodash';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    message: 'No orders yet'
  }

  handleAjaxResponse = (res) => {
    const normalizeOrdersResponse = (order, orderId) => {
      let output = { ...order };
      output.id = orderId;
      return output;
    };

    let { data: rawOrders } = res;
    const orders = _.map(rawOrders, normalizeOrdersResponse);
    this.setState({ loading: false, orders })
  }

  componentDidMount () {
    axios.get('/orders.json')
      .then( this.handleAjaxResponse )
      .catch( err => {
        this.setState({
          loading: false,
          message: `Something went wrong.  Try again later.` });
      });
  }

  createOrderComponent (order) {
    return (
      <Order key={order.id} ingredients={order.ingredients} />
    );
  }

  render () {
    const { loading, orders, message } = this.state;

    let display = loading ?
      <Spinner /> :
      orders && orders.length > 0 ?
        _.map(orders, this.createOrderComponent) :
        <h2 style={{ textAlign: 'center' }}>{ message }</h2>;

    return (
      <div>
        { display }
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
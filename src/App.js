import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout>
              <Route path="/" component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;

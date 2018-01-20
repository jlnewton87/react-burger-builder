import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';

export default class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 1,
      bacon: 3,
      cheese: 1,
      meat: 1
    }
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Builder Controls</div>
      </Aux>
    )
  }
}

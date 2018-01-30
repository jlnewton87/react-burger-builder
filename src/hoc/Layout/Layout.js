import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

export default class Layout extends Component {
  state = {
    sideDrawer: {
      open: false
    }
  };

  toggleSideDrawer = () => {
    this.setState((previousState) => {
      let newState = {...previousState};
      newState.sideDrawer.open = !previousState.sideDrawer.open;
      return newState;
    });
  }

  render() {
    return(
      <Aux>
        <Toolbar sideDrawerOp={this.toggleSideDrawer}/>
        <SideDrawer open={this.state.sideDrawer.open} sideDrawerOp={this.toggleSideDrawer}/>
        <main className={ classes.content }>
          { this.props.children }
        </main>
      </Aux>
    );
  }

}

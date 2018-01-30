import React, { Component } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

export default class Modal extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          closeContainer={this.props.close} />
        <div className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }} >
          {this.props.children}
        </div>
      </Aux>
    );
  };
}
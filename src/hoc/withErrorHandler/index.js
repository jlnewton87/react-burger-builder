import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    };

    interceptors = {};

    componentWillMount () {
      this.interceptors.req = axios.interceptors.request.use( req => {
        this.clearError();
        return req;
      } );
      this.interceptors.res = axios.interceptors.response.use( res => res, error => {
        this.setState({ error });
      } );
    }

    componentWillUnmount () {
      const { req, res } = this.interceptors;
      axios.interceptors.response.eject(res);
      axios.interceptors.request.eject(req);
    }

    clearError = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} close={this.clearError}>
            { this.state.error ? this.state.error.message : null }
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
};

export default withErrorHandler;
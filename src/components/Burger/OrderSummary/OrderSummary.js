import React from 'react';
import _ from 'lodash';
import { FAUL, FALI } from 'react-fontawesome';

import { ingredientSummary, getPrice } from '../../../utils/';

import classes from './OrderSummary.css';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

export default (props) => {

  const ingredientSummaryList = _.map(props.order, (count, name) => {
    return (
      <FALI name="caret-right" key={name}>{ ingredientSummary(name, count) }</FALI>
    );
  });

  return (
    <Aux>
      <h3 className={classes.center}>YOUR ORDER</h3>
      <p className={classes.center}>A delicious burger with the following ingredients:</p>
      <FAUL>
        { ingredientSummaryList }
      </FAUL>
      <p className={classes.center}>Total: ${getPrice(props.order).toFixed(2)}</p>
      <p className={classes.center}>Continue to checkout?</p>
      <Button
        type="danger"
        iconType='silly'
        clicked={props.cancelCheckout} >CANCEL</Button>
      <Button
        type="success"
        iconType='silly'
        clicked={props.continue} >CONTINUE</Button>
    </Aux>
  );
};
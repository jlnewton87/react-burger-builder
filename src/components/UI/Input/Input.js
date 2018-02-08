import React from 'react';

import classes from './Input.css';

const insertOptions = (options) => {
  return options ? options.map((option) => <option key={option.value} value={option.value}>{option.displayValue}</option>) : null;
};

const input = (props) => {
  const {options, ...config} = props.elementConfig;
  const inputTypes = {
    input: <input className={classes.InputElement} { ...config } value={props.value} />,
    textarea: <textarea className={classes.InputElement} { ...config } value={props.value} />,
    select: <select className={classes.InputElement} { ...config } value={props.value}>{insertOptions(options)}</select>
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{ props.label }</label>
      { inputTypes[props.elementType] }
    </div>
  );
};

export default input;
import React from 'react';

import classes from './Input.css';

const insertOptions = (options) => {
  return options ? options.map((option) => <option key={option.value} value={option.value}>{option.displayValue}</option>) : null;
};

const input = (props) => {
  const { validation } = props;
  const {options, ...config} = props.elementConfig;
  const style = validation.valid ?
    classes.InputElement :
    [classes.InputElement, classes.Invalid].join(' ');
  const message = validation.valid ?
    '' :
    validation.invalidMessage;
  const inputTypes = {
    input: <input
      onChange={props.changed}
      className={style}
      { ...config }
      value={props.value} />,
    textarea: <textarea
      onChange={props.changed}
      className={style}
      { ...config }
      value={props.value} />,
    select: <select
      onChange={props.changed}
      className={style}
      { ...config }
      value={props.value}>{insertOptions(options)}</select>
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>
        <span style={{ color: 'red', fontSize: '8px', paddingBottom: '5px' }}>* </span>
        { props.label }
      </label>
      { inputTypes[props.elementType] }
      <span className={classes.Message}>{ message }</span>
    </div>
  );
};

export default input;
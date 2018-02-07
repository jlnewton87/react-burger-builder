import React from 'react';

import classes from './Input.css';

const input = (props) => {
  const { inputType, ...htmlSafeProps } = props;
  const inputTypes = {
    _: <input className={classes.InputElement} { ...htmlSafeProps } />,
    textarea: <textarea className={classes.InputElement} { ...htmlSafeProps } />
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{ props.label }</label>
      { props.inputType === 'textarea' ? inputTypes.textarea : inputTypes._ }
    </div>
  );
};

export default input;
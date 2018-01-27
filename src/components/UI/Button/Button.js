import React from 'react';

import classes from './Button.css';

const button = (props) => {
  const classList = [ classes.Button ]
  classList.push(
    props.type === 'success' ?
      classes.Success :
      classes.Danger
  );
  return (
    <button
    onClick={props.clicked}
    className={classList.join(' ')}>
      {props.children}
    </button>
  );
};

export default button;
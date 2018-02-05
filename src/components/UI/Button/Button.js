import React from 'react';
import FA from 'react-fontawesome';

import classes from './Button.css';

const getIcon = (className, iconType) => {
  const iconName = [iconType, className].join('');
  console.log(iconName)
  const icons = {
    sillysuccess: <FA name="smile-o" />,
    sillydanger: <FA name="frown-o" />,
    boringsuccess: <FA name="check-circle-o" />,
    boringdanger: <FA name="times-circle-o" />
  };

  return icons[iconName];
}

const button = (props) => {
  const icon = getIcon(props.type, props.iconType || 'boring')
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
      {icon} {props.children}
    </button>
  );
};

export default button;
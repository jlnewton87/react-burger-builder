import React from 'react';

import imgSrc from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = (props) => {
  const { size, height } = props;
  const myHeight = getHeight(size, height);
  return (
    <div className={classes.Logo} style={{ height: myHeight }}>
      <img src={imgSrc} alt="Logo"/>
    </div>
  );
};

const getHeight= (size, height) => {
  const small = '11%';
  const large = '80%';
  return size ?
    size === 'large' ? large : small :
    height;
}

export default logo;
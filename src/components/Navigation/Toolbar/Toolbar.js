import React from 'react';
import FA from 'react-fontawesome';

import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={[classes.SideDrawerToggle, classes.MobileOnly].join(' ')}
        onClick={props.sideDrawerOp} >
        <FA
        name="reorder"
        className={classes.ToggleIcon} />
      </div>
      <Logo size="large"/>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
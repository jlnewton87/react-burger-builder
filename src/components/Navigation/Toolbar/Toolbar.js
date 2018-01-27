import React from 'react';

import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div>Menu</div>
      <Logo size="large"/>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
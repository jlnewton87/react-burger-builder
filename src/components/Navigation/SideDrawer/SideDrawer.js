import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
  let classNames = [ classes.SideDrawer ];
  props.open ? classNames.push(classes.Open) : classNames.push(classes.Close);
  return (
    <Aux>
      <Backdrop
        show={props.open}
        closeContainer={props.sideDrawerOp} />
      <div className={classNames.join(' ')}>
        <Logo
          size="small" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
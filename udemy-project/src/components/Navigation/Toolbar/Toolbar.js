import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
  <DrawerToggle clicked={props.DrawerToggleClicked}/>
    <div>MENU</div>
    <div className={classes.Logo}>
    <Logo/>
    </div>
    <nav className={classes.DesktopOnly}>
     <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
)

export default toolbar;
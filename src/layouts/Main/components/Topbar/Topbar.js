import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
// import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const handleSignout = () =>  { 
  localStorage.removeItem('token');
  // console.log('sign out');
  // axios.get('http://localhost:4000/admin/logout').finally (()=>{
  //   localStorage.removeItem('token');
  //   console.log('sign out');
  // });
};

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/dashboard">
          <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleSignout}
            to="/sign-in" 
          >
            <RouterLink 
              style={{height: '24px', color: 'inherit'}}
              to="/sign-in"
            >
              <InputIcon />
            </RouterLink>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton 
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleSignout}
            to="/sign-in" 
          >
            <RouterLink 
              style={{height: '24px', color: 'inherit'}}
              to="/sign-in"
            >
              <InputIcon />
            </RouterLink>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;

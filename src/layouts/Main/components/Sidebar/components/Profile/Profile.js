/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import axios from 'axios';
import { getInitials } from 'helpers';
import { API, ADMIN } from '../../../../../../config';
const api = `${API}${ADMIN}`;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles([]);


  let [user, setUsers] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '09888',
    address: 'Alabama',
  });



  useEffect(() => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    const loadData = async () => {
      try {
        const response = await axios.get(api, {
          headers: { Authorization: header },
        });
        const { user } = response.data;
        setUsers(user);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
    
  }, []);


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      >
        {getInitials(user.lastName)}
      </Avatar>
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.lastName}
      </Typography>
      <Typography variant="body2">{user.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;

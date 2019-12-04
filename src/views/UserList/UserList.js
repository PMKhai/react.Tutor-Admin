/* eslint-disable no-console */
import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const UserList = () => {
  const classes = useStyles();  
  let [users, setUsers] = useState([]);
  
  useEffect(() => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    const loadData = async () => {
      try {
        const response = await axios.get('https://api-tutor-admin.herokuapp.com/users', {
          headers: { Authorization: header },
        });
        console.log(response.data);
        // We have a response, but let's first check if component is still mounted
        setUsers(response.data);
      } catch(error) {
        console.log(error);
      }
    };
    loadData();
  }, []);
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;

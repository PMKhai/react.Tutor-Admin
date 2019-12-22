/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {API , LISTCONTRACT } from '../../config';
import { ContractToolbar, ContractCard } from './components';
const api = `${API}${LISTCONTRACT}`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const ContractList = () => {
  const classes = useStyles();
  let [users, setUsers] = useState([]);

  useEffect(() => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    const loadData = async () => {
      try {
        const response = await axios.get(api, {
          headers: { Authorization: header },
        });
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);
  return (
    <div className={classes.root}>
      <ContractToolbar />
      <div className={classes.content}>
        <ContractCard users={users} />
      </div>
    </div>
  );
};



export default ContractList;

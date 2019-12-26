/* eslint-disable no-console */
import React, { useState, useEffect } from './../../../node_modules/react';
import { makeStyles } from './../../../node_modules/@material-ui/styles';
import axios from './../../../node_modules/axios';
import {API , REPORTS } from '../../config';
import {  ContractCard } from './components';
const api = `${API}${REPORTS}`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const ReportList = () => {
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
  }, [users]);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ContractCard users={users} />
      </div>
    </div>
  );
};



export default ReportList;

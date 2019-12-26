/* eslint-disable no-console */
import React , { useState , useEffect  }from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';
import axios from 'axios';
import {API , BUDGET ,TOTAL } from '../../config';
const api = `${API}${BUDGET}`;
const apiTOTAL = `${API}${TOTAL}`;
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const [bubget, setbubget] = useState();
  const [total, setTotal] = useState();
  const classes = useStyles();
  const header = `Bearer ${localStorage.getItem('token')}`;
  const loadData = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: header },
      });
      const {data} = response.data[0];
      setbubget(data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadTotal = async () => {
    try {
      const response = await axios.get(apiTOTAL, {
        headers: { Authorization: header },
      });
      const {data} = response.data[0];
      setTotal(data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
    loadTotal();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget bubget = {total}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit total = {bubget}/>
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

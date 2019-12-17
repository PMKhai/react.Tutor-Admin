/* eslint-disable no-console */
import React, { useState , useEffect  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Switch,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserDetail = props => {
  const { className,...rest } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
  });
  const {user} = rest;
  useEffect(() => {
    setValues(user);
  }, []);
  
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      isActivated : event.target.checked
    });
    
  };

  
  const updateAdminUser = () =>{
    console.log('update user ', values);
  };

  const isActive = (values)=>{
    if (values.isActivated === true || values.isActivated === 'true') {
      return true;
    } else {
      return false;
    }
  };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Overview"
                margin="dense"
                name="overview"
                onChange={handleChange}
                type="text"
                value={values.overview || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={values.address || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {/* <TextField
                fullWidth
                label="Active"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={values.address || ''}
                variant="outlined"
              /> */}
              <FormControlLabel
                control={
                  <Switch 
                    checked={isActive(values)|| false} 
                    name="isActivated"
                    onChange={handleChange}
                    value={true}
                  />    
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

        <CardActions>
          <Button
            color="primary"
            onClick ={updateAdminUser}
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

UserDetail.propTypes = {
  className: PropTypes.string
};

export default UserDetail;

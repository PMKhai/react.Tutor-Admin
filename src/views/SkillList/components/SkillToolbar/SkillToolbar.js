/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button,
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions

} from '@material-ui/core';
import axios from 'axios';
import { SearchInput } from 'components';
import {API,ADDSKILL} from '../../../../config';
const api = `${API}${ADDSKILL}`;

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  // const handleRenderComponent = () =>{
  //   setShowFromEdit(true);
  // };
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name : ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () =>{
    console.log(values);
    const header = `Bearer ${localStorage.getItem('token')}`;
     
    console.log(header);
    axios.post(api, {
      name: values.name,
    },{
      headers: { Authorization: header },
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          onClick={handleClickOpen}
          variant="contained"
        >
          Add Skill
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
      <div>
        <Dialog
          aria-labelledby="form-dialog-title"
          onClose={handleClose}
          open={open}
        >
          <DialogTitle id="form-dialog-title">Add new Skill</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add new Skill into your website
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              id="name"
              label="Name of Skill"
              margin="dense"
              name = "name"
              onChange={handleChange}
              type="text"
              value = {values.name}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleAdd}
            >
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>

  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;

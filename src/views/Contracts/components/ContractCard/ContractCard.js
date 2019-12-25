/* eslint-disable no-console */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import Moment from 'react-moment';
import axios from 'axios';
import {API , UPDATESTATUS } from '../../../../config';
const api = `${API}${UPDATESTATUS}`;

// import { SettingsApplications } from '@material-ui/icons';
// import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  displayCombonent: {
    display: 'flex',
    justifyContent: 'center',
    zIndex: '10',
    position: 'absolute'
  },
  cardDetail: {
    width: '75%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ContractCard = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);


  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const loadData = async (value , status) => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    try {
      await axios.post(api, {
        _id: value._id,
        status:status,
        
      }, {
        headers: { Authorization: header },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (event,value)  => {
    // setStatus(event.target.value);
    loadData(value,event.target.value);
    // console.log(value._id);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>

                  <TableCell>Day Of Hire</TableCell>
                  <TableCell>tutor</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(value => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={value.email}
                  >
                    <TableCell>
                      <Moment
                        date={value.dayOfHire}
                        format="YYYY/MM/DD"
                      /></TableCell>
                    <TableCell>
                      {value.tutor}
                    </TableCell>
                    <TableCell>{value.student}</TableCell>
                    <TableCell>

                      {value.totalMoney}$
                    </TableCell>
                    <TableCell>
                      <FormControl className={classes.formControl}>
                        <InputLabel 
                          id="demo-simple-select-placeholder-label-label"
                          shrink
                        >
                          Status
                        </InputLabel>
                        <Select
                          className={classes.selectEmpty}
                          // displayEmpty
                          id="demo-simple-select-placeholder-label"
                          labelId="demo-simple-select-placeholder-label-label"
                          onChange={event => handleStatusChange(event, value)}
                          value={value.status}
                        >
                          {value.status}
                          <MenuItem value="cancel">cancel</MenuItem>
                          <MenuItem value="done">done</MenuItem>
                          <MenuItem value="pending" >pending</MenuItem>
                        </Select>
                      </FormControl>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card >
  );
};

ContractCard.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};


export default ContractCard;

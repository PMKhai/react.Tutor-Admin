/* eslint-disable no-console */
import React, { useState } from './../../../../../node_modules/react';
import clsx from './../../../../../node_modules/clsx';
import PropTypes from './../../../../../node_modules/prop-types';
// import moment from 'moment';
import PerfectScrollbar from './../../../../../node_modules/react-perfect-scrollbar';
import { makeStyles } from './../../../../../node_modules/@material-ui/styles';
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

} from './../../../../../node_modules/@material-ui/core';
// import Moment from './../../../../../node_modules/react-moment';
// import axios from './../../../../../node_modules/axios';
// import {API , UPDATESTATUS } from '../../../../config';
// const api = `${API}${UPDATESTATUS}`;


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

const ReportCard = props => {
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

  // const loadData = async (value , status) => {
  //   const header = `Bearer ${localStorage.getItem('token')}`;
  //   try {
  //     await axios.post(api, {
  //       _id: value._id,
  //       status:status,
  //       money:value.totalMoney
  //     }, {
  //       headers: { Authorization: header },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const handleStatusChange = (event,value)  => {
  //   loadData(value,event.target.value);

  // };

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

                  <TableCell>tutor</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>report</TableCell>
                  <TableCell>vote</TableCell>
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
                      {value.tutor}
                    </TableCell>
                    <TableCell>{value.student}</TableCell>
                    <TableCell>

                      {value.description}
                    </TableCell>
                    <TableCell>
                      {value.vote}
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

ReportCard.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};


export default ReportCard;

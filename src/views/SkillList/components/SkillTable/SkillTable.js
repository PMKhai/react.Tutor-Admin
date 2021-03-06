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
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  // Typography,
  TablePagination,
  // Button,
} from '@material-ui/core';
// import { SettingsApplications } from '@material-ui/icons';
import { getInitials } from 'helpers';
// import AccountDetails from '../../../Account/components/AccountDetails';

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
  }
}));

const SkillsTable = props => {
  const { className, skills, ...rest } = props;
  const {onSelected} = rest;
  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  // const [showFromEdit, setShowFromEdit] = useState(false);
  // const [userUpdate , setUserUpdate] = useState([]);

  const handleSelectAll = event => {
    const { skills } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = skills.map(skill => skill.name);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
    onSelected(selectedUsers);
  };

  const handleSelectOne = (event, email) => {
    const selectedIndex = selectedUsers.indexOf(email);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, email);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
    onSelected(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  // var isShow = true;
  // // eslint-disable-next-line react/no-multi-comp
  // const handleRenderComponent = (skill) =>{
  //   setUserUpdate(skill);
  //   setShowFromEdit(isShow);
  //   console.log(skill.name);
  //   isShow = !isShow
  // };

  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        {/* {showFromEdit ? <div className={classes.displayCombonent}> 
          <Card className={classes.cardDetail}> 
            <AccountDetails user={userUpdate.user}/>
          </Card>
        </div> : null} */}
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === skills.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < skills.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>name</TableCell>
                  <TableCell>Decription</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {skills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(skill => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={skill.name}
                    selected={selectedUsers.indexOf(skill.name) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(skill.name) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, skill.name)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={skill.imgUrl}
                        >
                          {getInitials(skill.name)}
                        </Avatar>
                      </div>
                    </TableCell>
                    <TableCell>{skill.name}</TableCell>
                    <TableCell>{skill.description}</TableCell>
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
          count={skills.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
      
    </Card>
    
  );
};

SkillsTable.propTypes = {
  className: PropTypes.string,
  skills: PropTypes.array.isRequired
};

export default SkillsTable;

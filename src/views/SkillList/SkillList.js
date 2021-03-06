/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {API,LISTSKILL} from '../../config';
import { SkillsToolbar, SkillsTable } from './components';
const api = `${API}${LISTSKILL}`;
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const SkillList = () => {
  const classes = useStyles();
  let [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    const loadData = async () => {
      try {
        const response = await axios.get(api, {
          headers: { Authorization: header },
        });
        // console.log(response.data);
        setSkills(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [skills]);
  const setSelected = (value) => {
    setSelectedSkills(value);
  };
  return (
    <div className={classes.root}>
      <SkillsToolbar selectedSkill = {selectedSkills}/>
      <div className={classes.content}>
        <SkillsTable 
          onSelected = {setSelected}
          skills={skills} 
        />
      </div>
    </div>
  );
};

export default SkillList;

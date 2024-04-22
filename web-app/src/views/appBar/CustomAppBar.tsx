import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import logo from './Logo.png';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    justifyContent: 'space-between',
    maxWidth: '800'
  }
}));

const CustomAppBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {/* <img src={logo} width={150} alt="logo" /> */}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;

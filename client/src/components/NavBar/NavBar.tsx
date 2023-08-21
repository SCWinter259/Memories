import React from 'react';
import {AppBar, Typography} from '@material-ui/core';
import memories from '../../images/memories.png'

import useStyles from './styles';

export const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
    );
}
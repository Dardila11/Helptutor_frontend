import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Box, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 600,
    borderRadius: '20px'
  },
  input: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(2),
    borderRadius: '20px'
  },
  principalContainer: {
      margin: theme.spacing(1)
  },
  icon: {
      marginLeft: theme.spacing(1)
  }
}));

const SearchBar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.principalContainer}> 
        <Paper component="form" className={classes.root}>
        <IconButton className={classes.icon} type="submit" aria-label="search">
            <SearchIcon />
        </IconButton>
        <TextField className={classes.input} id="searchInput" fullWidth label="Buscar en helptutor" variant="outlined" color='primary' margin='none'/>
        </Paper>
    </Box>
  );
}

export default SearchBar
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import { Box, InputAdornment, TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px'
  },
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: '20px'
  },
  principalContainer: {
    margin: theme.spacing(1)
  },
}))

const SearchBar = (option) => {
  const classes = useStyles()

  return (
    <Paper component="form" className={classes.root}>
      <Box className={classes.principalContainer} display='flex' flexDirection='column'>
        <Box>
            <TextField
              className={classes.input}
              id="searchInput"
              label="Buscar en helptutor"
              variant="outlined"
              color="primary"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
        </Box>
        {option === 'advertisement'? 
        (
          <Box textAlign='center'>
            <Typography>Filtros</Typography>
          </Box>
        ):<></>}
      </Box>    
    </Paper>
  )
}

export default SearchBar

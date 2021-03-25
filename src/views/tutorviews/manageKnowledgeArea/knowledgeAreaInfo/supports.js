//REACT
import React from 'react'

//COMPONENTS MATERIAL UI
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'

//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {},
  title:{
    marginTop: theme.spacing(1)
  },
  container: {
    marginLeft: theme.spacing(2)
  },
  input:{
    display: 'none'
  }
}))

const SupportsView = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.root} elevation={3}>
      <Typography className={classes.title} variant="h4" align='center'>Soportes</Typography>
      <Grid className={classes.container} container spacing={2}>
        <Grid item xs={6}>
          <Typography>No existen soportes para esta area</Typography>
        </Grid>
        <Grid item xs={6}>
        <input
          className={classes.input}
          accept="application/pdf"
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            SUBIR SOPORTE
          </Button>
        </label>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SupportsView

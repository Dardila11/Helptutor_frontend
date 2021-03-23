//REACT
import React from 'react'

//COMPONENTS MATERIAL UI
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'

//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {},
  gridContainer: {}
}))

const SupportsView = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h4">Soportes</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Lista de soportes</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button color="primary" variant="contained">
            Subir Soporte
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SupportsView

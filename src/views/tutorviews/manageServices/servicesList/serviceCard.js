import React, { useState } from 'react'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBlockEnd: theme.spacing(1),
    borderRadius: '20px',
    border: '0px'
  },
  delete: {
    float: 'right',
    color: theme.palette.secondary
  },
  button: {
    borderRadius: '20px',
    marginBottom: theme.spacing(1),
    textTransform: 'none'
  }
}))

const ServiceCard = ({service, handleSelect}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    setOpen(false)
    //TODO DELETE
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={9}>
            <Button
              className={classes.button}
              fullWidth={true}
              variant="outlined"
              onClick={() => {
                handleSelect(service)
              }}>
              <Typography align="center" variant="h5">
                {' '}
                {service.title}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              className={classes.button}
              id={service.id}
              key={service.id}
              color="secondary"
              onClick={handleOpen}>
              <DeleteIcon className={classes.delete} />
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{'Advertencia'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Estas seguro de eliminar el servicio{' '}
                  <b>{service.title}</b> ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button
                  onClick={handleDelete}
                  color="primary"
                  variant="contained"
                  autoFocus>
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ServiceCard

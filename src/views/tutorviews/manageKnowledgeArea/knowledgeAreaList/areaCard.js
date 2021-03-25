import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

//REDUX
import {
  getSpecialities,
  deleteSpecialityTutor,
  setSpecialityTutor,
  setIsCreate
} from '../../../../redux/actions/knowledge_areas'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBlockEnd: theme.spacing(1),
    borderRadius: '20px'
  },
  delete: {
    float: 'right',
    color: '#ff7961'
  },
  button:{
    borderRadius: '20px'
  }
}))

const AreaCard = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    setOpen(false)
    props.deleteSpecialityTutor(props.idArea)
    props.setIsCreate(true)
  }
  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }
  return (
    <>
      <Paper className={classes.root} elevation={3}>
        <Grid container>
          <Grid item xs={9}>
            <Button
              className={classes.button}
              fullWidth={true}
              variant='outlined'
              onClick={()=>{
                props.getSpecialities(props.my_area.knowledge_area.knowledge_area)
                props.setSpecialityTutor(props.my_area)
              }}>
              <Typography align="left"> <b>{props.area.name}</b></Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              className={classes.button}
              id={props.area.id}
              key={props.area.id}
              color='secondary'
              onClick={handleOpen}>
              <DeleteIcon className={classes.delete} />
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Advertencia"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Estas seguro de eliminar el area <b>{props.area.name}</b> ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button onClick={handleDelete} 
                  color="secondary" 
                  variant='contained'
                  autoFocus>
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

const mapStateToProps = (state) => ({
  specialities_tutor: state.knowledge_areas.specialities_tutor
})

export default connect(mapStateToProps, {
  deleteSpecialityTutor,
  setSpecialityTutor,
  getSpecialities,
  setIsCreate
})(AreaCard)

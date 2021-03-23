import React from 'react'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import Api from '../../../../services/Api'
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
    marginBlockEnd: theme.spacing(1)
  },
  delete: {
    float: 'right'
  }
}))

const AreaCard = (props) => {
  const classes = useStyles()
  const handleClick = () => {
    props.deleteSpecialityTutor(props.idArea)
  }
  return (
    <>
      <Paper className={classes.root} elevation={3}>
        <Grid container>
          <Grid item xs={9}>
            <Button
              variant="outlined"
              onClick={() => {
                props.getSpecialities(props.my_area.knowledge_area.knowledge_area)
                props.setSpecialityTutor(props.my_area)
              }}>
              <Typography align="left">{props.area.name}</Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              id={props.area.id}
              key={props.area.id}
              onClick={handleClick}>
              <DeleteIcon className={classes.delete} />
            </Button>
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

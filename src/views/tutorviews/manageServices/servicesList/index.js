//REACT
import React, { useEffect } from 'react'

//REDUX
import { getServicesTutor,setIsCreate } from '../../../../redux/actions/services'
import { connect } from 'react-redux'

//COMPONENTS MATERAIL UI
import { Button, Card, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';

//COMPONENTS
import ServiceCard from './serviceCard'

//UTILS
import { isUndefined } from 'lodash-es'

//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingTop: theme.spacing(3)
  },
  containerTitle: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  actions:{
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  lateralView:{
    borderRadius: '20px'
  }
}))

const ServicesListView = (props) => {

  const {services_tutor, getServicesTutor, user} = props
  const classes = useStyles()
  let info = false
  if (isUndefined(services_tutor)) {
    info = false
  } else {
    info = true
  }

  const handleClick = (e) => {
    props.setIsCreate(true)
  }

  useEffect(() => {
      getServicesTutor(user.id)
  })
  
  return (
    <>
      <Grid item xs={3}>
        <Paper className={classes.lateralView} elevation={2} >
          <Card className={classes.lateralView}>
            <Typography
              className={classes.containerTitle}
              variant="h4"
              align="center">
              Servicios
            </Typography>
            {info ? (
              <>
                {services_tutor.map((area, index) => (
                  <ServiceCard
                    key={index}
                    area={area.knowledge_area}
                    my_area={area}
                    idArea={area.id}/>
                ))}
              </>
            ) : (
              <>
                <Typography align='center'>No se encontraron servicios</Typography>
              </>
            )}
            <Container className={classes.actions}>
              <Button
              fullWidth
              color='primary'
              variant='contained'
              endIcon={<AddCircleIcon />}
              onClick={handleClick}>
                Agregar Servicio
              </Button>
            </Container>
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => ({
    services_tutor: state.services.services_tutor,
    is_create: state.knowledge_areas.is_create,
    user: state.auth.user
})

export default connect(mapStateToProps, {
  getServicesTutor,
  setIsCreate
})(ServicesListView)

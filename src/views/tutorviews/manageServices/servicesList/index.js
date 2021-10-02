//REACT
import React from 'react'

//COMPONENTS MATERAIL UI
import {
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

//COMPONENTS
import ServiceCard from './serviceCard'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { useNavigate } from 'react-router'

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
  actions: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  lateralView: {
    borderRadius: '20px'
  },
  button: {
    textTransform: 'none'
  }
}))

const ServicesListView = ({ services, handleSelect }) => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Paper className={classes.lateralView} elevation={2}>
      <Card className={classes.lateralView}>
        <Container className={classes.actions}>
          <Button
            className={classes.button}
            fullWidth={true}
            color="secundary"
            variant="contained"
            startIcon={<ArrowBackIos />}
            onClick={() => navigate('/tutor/cuenta')}>
            Menú
          </Button>
        </Container>
        <Typography
          className={classes.containerTitle}
          variant="h4"
          align="center">
          Servicios
        </Typography>
        {services.length > 0 ? (
          <>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                id={service.id}
                service={service}
                handleSelect={handleSelect}
              />
            ))}
          </>
        ) : (
          <>
            <Typography align="center">No se encontraron servicios</Typography>
          </>
        )}

        <Container className={classes.actions}>
          <Button
            className={classes.button}
            fullWidth
            color="primary"
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={() => handleSelect(null)}>
            Agregar Servicio
          </Button>
        </Container>
      </Card>
    </Paper>
  )
}

export default ServicesListView

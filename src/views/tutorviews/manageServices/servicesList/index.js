//REACT
import React from 'react'

//COMPONENTS MATERAIL UI
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

//COMPONENTS
import ServiceCard from './serviceCard'

import useTutorServices from 'src/hooks/TutorHooks/useTutorServices'

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

const ServicesListView = () => {
  const {data, isLoading } = useTutorServices()
  const classes = useStyles()

  return (
    <>
      <Grid item xs={3}>
        <Paper className={classes.lateralView} elevation={2}>
          <Card className={classes.lateralView}>
            <Typography
              className={classes.containerTitle}
              variant="h4"
              align="center">
              Servicios
            </Typography>
            {isLoading ? (
              <>
                {data.length>0 ? (
                  <>
                    {data.map((service, index) => (
                      <ServiceCard
                        key={index}
                        id={service.id}
                        service={service}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <Typography align="center">
                      No se encontraron servicios
                    </Typography>
                  </>
                )}
              </>
            ) : (
              <CircularProgress />
            )}

            <Container className={classes.actions}>
              <Button
                className={classes.button}
                fullWidth
                color="primary"
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={()=>{}}>
                Agregar Servicio
              </Button>
            </Container>
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

export default ServicesListView

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Box, DialogTitle, Grid, IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import NominationsView from './nominations'
import ProfileView from 'src/components/tutorProfileCard'
import Schedule from 'src/components/Schedule/Schedule'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  nextButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing(1)
  }
}))

function getSteps() {
  return ['Selecciona un tutor', 'Información del tutor','Selecciona el horario', 'Pagar'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Selecciona el tutor'
    case 1:
      return 'Información del tutor'
    case 2:
      return 'Selecciona el horario'
    case 3:
      return  'Pagar'
    default:
      return ''
  }
}

const TutorSelectionView = (props) => {
  const { publication } = props
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [idTutor, setIdTutor] = React.useState(null)
  const steps = getSteps()

  const handleNomination = (tutor) => {
    if(activeStep<3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setIdTutor(tutor.tutor)
  }

  const handleNext = () => {

    if(activeStep<3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className={classes.root}>
        <DialogTitle id='publications-dialog-title' align='center'>
            <Typography className={classes.instructions} variant='h4'>{getStepContent(activeStep)}</Typography>
        </DialogTitle>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Grid container>         
                <Grid item xs={1}>
                {activeStep>0?(                    
                        <IconButton onClick={handleBack}>
                            <ArrowBackIosIcon/>
                        </IconButton>
                ):(<></>)}
                </Grid>
                <Grid item xs={10}>
                    {activeStep===0 ? (
                        <NominationsView key={publication.id} id={publication.id} publication={publication} next={handleNomination}/>
                    ):(<></>)}
                    {activeStep===1 ? (
                        <>
                        <ProfileView idTutor={idTutor}/>
                        <Box className={classes.nextButton}>
                          <Button size='large' variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                            Siguiente
                          </Button>
                        </Box>
                        </>
                    ):(<></>)}
                    {activeStep===2 ?(
                        <>
                        <Schedule />
                        <Box className={classes.nextButton}>
                          <Button size='large' variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                            Siguiente
                          </Button>
                        </Box>
                        </>
                    ):(<></>)}
                    {activeStep===3 ? (
                        <>
                        <Typography>
                            Aqui se muestra la informacion del servicio a contratar, y se pone un boton para redirigir al pago
                        </Typography>
                        <Box className={classes.nextButton}>
                          <Button size='large' variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                            Finalizar
                          </Button>
                        </Box>
                        </>
                    ):(<></>)}
                </Grid>
                <Grid item xs={1}>
                      <>
                      </>
                </Grid>
            </Grid>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
        </Box>
    </div>
  )
}

export default TutorSelectionView

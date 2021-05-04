import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Box, DialogTitle, Grid, IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  }
}))

function getSteps() {
  return ['Información del tutor', 'Selecciona el horario', 'Pagar']
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Información del tutor'
    case 1:
      return 'Selecciona el horario'
    case 2:
      return 'Pagar'
    default:
      return ''
  }
}

const ServiceSelectionView = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    if (activeStep < 2) setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className={classes.root}>
      <DialogTitle id="publications-dialog-title" align="center">
        <Typography className={classes.instructions}>
          {getStepContent(activeStep)}
        </Typography>
      </DialogTitle>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Grid container>
          <Grid item xs={1}>
            {activeStep > 0 ? (
              <IconButton onClick={handleBack}>
                <ArrowBackIosIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={11}>
            {activeStep === 0 ? (
              <>
                <Typography>Aqui van los tutores que se ofertaron</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </>
            ) : (
              <></>
            )}
            {activeStep === 1 ? (
              <>
                <Typography>
                  Aqui se muestra el horario disponible del tutor
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </>
            ) : (
              <></>
            )}
            {activeStep === 2 ? (
              <>
                <Typography>
                  Aqui se muestra la informacion del servicio a contratar, y se
                  pone un boton para redirigir al pago
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </Box>
    </div>
  )
}

export default ServiceSelectionView

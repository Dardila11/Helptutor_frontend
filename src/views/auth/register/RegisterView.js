import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  makeStyles,
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core'
import Page from '../../../components/Page'
/* import SignInGoogle from '../../../components/SignGoogle'
import RoleCard from '../../../components/RoleCard'
import Api from '../../../services/Api' */
import UserInformation from './UserInformation'
import SelectRole from './SelectRole'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  selectControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  input: {
    color: '#005579'
  },
  text: {
    width: '270px'
  },
  back: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.background.dark
    }
  }
}))

function getSteps() {
  return ['Información personal', 'Seleccionar rol', 'Información completa']
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <UserInformation />
    case 1:
      return <SelectRole />
    case 2:
      return 'Registro completo'
    default:
      return 'Unknown stepIndex'
  }
}

const RegisterView = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  /* const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  } */

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center">
        <Container maxWidth="sm">
          <Stepper
            className={classes.back}
            activeStep={activeStep}
            alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              'Registro completado'
            ) : (
              <>
                {getStepContent(activeStep)}
                <Button onClick={handleNext}>
                  {activeStep === steps.length ? 'Registrarse' : 'Siguiente'}
                </Button>
              </>
            )}
          </>
        </Container>
      </Box>
    </Page>
  )
}

export default RegisterView

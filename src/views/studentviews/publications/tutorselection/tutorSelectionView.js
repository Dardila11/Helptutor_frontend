import React, { useEffect, useState } from 'react'
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Avatar,
  Box,
  Card,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  IconButton
} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import CloseIcon from '@material-ui/icons/Close'
import NominationsView from './nominations'
import ProfileView from 'src/components/cards/tutorProfileCard'
import ProfileViewSkeleton from 'src/components/skeletons/ProfileViewSkeleton'
import useTutorInfo from 'src/hooks/TutorHooks/useTutorInfo'
import {useReviews} from 'src/hooks/TutorHooks/useReviews'
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
  },
  contractInformation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: theme.spacing(2),
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  cover: {
    width: 80,
    height: 80,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3)
  },
  card: {
    margin: theme.spacing(1),
    borderRadius: '20px'
  },
  centerStepper: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

function getSteps() {
  return [
    'Selecciona un tutor',
    'Información del tutor',
    'Selecciona franja',
    'Resumen'
  ]
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Selecciona el tutor'
    case 1:
      return 'Información del tutor'
    case 2:
      return 'Selecciona franja'
    case 3:
      return 'Resumen'
    default:
      return ''
  }
}

const TutorSelectionView = (props) => {
  const { publication } = props
  const classes = useStyles()
  const [contract, setContract] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [idTutor, setIdTutor] = useState(null)
  const steps = getSteps()
  const tutorInfoQuery = useTutorInfo(idTutor)
  const reviewsQuery = useReviews(idTutor)
  const [scheduleSelected, setScheduleSelected] = useState({})

  useEffect(() => {
    if (idTutor !== null) {
      tutorInfoQuery.refetch()
      reviewsQuery.refetch()

    }
  }, [idTutor])

  useEffect(() => {
    console.log(contract)
  },[contract])

  const handleNext = () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNomination = (nomination) => {
    setContract({ ...contract, nomination: nomination })
    console.log(nomination.tutor.user.id)
    setIdTutor(nomination.tutor.user.id)
    handleNext()
  }

  const handleSchedule = (slot) => {
    setContract({ ...contract, slot: slot , tutor: tutorInfoQuery.data})
    handleNext()
  }

  const handleScheduleSelected = (schedule) => {
    setScheduleSelected(schedule)
  }

  /*const handlePayment = () => {
    const data = {
      merchantId: '871233',
      accountId: '878901',
      description: 'Test PAYU',
      referenceCode: 'TestPAYU',
      amount: '20000',
      tax: '3193',
      taxReturnBase: '16806',
      currency: 'COP',
      signature: '7ee7cf808ce6a39b17481c54f2c57acc',
      test: '0', 
      buyerEmail: 'test@test.com',
      responseUrl: 'http://www.test.com/response',
      confirmationUrl: 'http://www.test.com/confirmation'
    }
    axios.post('https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/', data).then(
      (res) => {
        console.log(res)
      }
    ).catch((err) => {
      console.log(err)
    })
  }*/

  return (
    <>
      <DialogTitle
        id="publications-dialog-title"
        align="center"
        onClose={props.onClose}>
        <Box display="flex" alignItems="center">
          {activeStep === 0 ? (
            <></>
          ) : (
            <IconButton onClick={handleBack}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Box flexGrow={1}>
            <Typography variant="h3" className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
          </Box>
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Grid container>              
              <Grid item xs={12}>
                {activeStep === 0 ? (
                  <NominationsView
                    key={publication.id}
                    publication={publication}
                    next={handleNomination}
                  />
                ) : (
                  <></>
                )}
                {activeStep === 1 ? (
                  tutorInfoQuery.status === 'success' && reviewsQuery.status === 'success' ? (
                    <ProfileView tutor={tutorInfoQuery.data} reviews={reviewsQuery.data} />
                  ) : (
                    <ProfileViewSkeleton />
                  )
                ) : (
                  <></>
                )}
                {activeStep === 2 ? <Schedule next={handleSchedule} handleScheduleSelected={handleScheduleSelected} /> : <></>}
                {activeStep === 3 ? (
                  <>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center">
                      <Box>
                        <Typography variant="h4" textAlign="center">
                          Información del servicio a contratar
                        </Typography>
                      </Box>
                      <Card className={classes.card} elevation={3}>
                        <Box className={classes.contractInformation}>
                          <Box display="flex" justifyContent="center">
                            <Avatar
                              className={classes.cover}
                              alt="user photo"
                              src={contract.tutor.user.photo}
                            />
                          </Box>
                          <Box>
                            <Typography>
                              <b>Tutor:</b> {tutorInfoQuery.data.user.first_name}{' '}
                              {tutorInfoQuery.data.user.last_name}
                            </Typography>
                            <Typography>
                              <b>Precio:</b> ${contract.nomination.price}
                            </Typography>
                            <Typography>
                              <b>Franja:</b> {contract.slot.day} de{' '}
                              {contract.slot.start_time <= 12
                                ? contract.slot.start_time
                                : contract.slot.start_time - 12}{' '}
                              {contract.slot.start_time < 12 ? 'am' : 'pm'} a{' '}
                              {contract.slot.end_time <= 12
                                ? contract.slot.end_time
                                : contract.slot.end_time - 12}{' '}
                              {contract.slot.end_time < 12 ? 'am' : 'pm'}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={1}>
                <></>
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions classes={{ root: classes.centerStepper }}>
        <Box display="flex" flexDirection="column">
          {activeStep !== 0 && activeStep !== 2 ? (
            <Box className={classes.nextButton}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                /* disabled={activeStep === 2 && scheduleSelected == {} ? true : false} */
                onClick={handleNext}
                className={classes.button}>
                {activeStep === 1 || activeStep === 2 ? 'Siguiente' : 'Ir al pago'}
              </Button>
            </Box>
          ) : (
            <></>
          )}
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
      </DialogActions>
    </>
  )
}

export default TutorSelectionView

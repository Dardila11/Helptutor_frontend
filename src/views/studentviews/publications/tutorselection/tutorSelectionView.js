import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {
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
import Schedule from 'src/components/Schedule/Schedule'
import ProfileViewSkeleton from 'src/components/skeletons/ProfileViewSkeleton'

import { getTutorSelectedInfo } from 'src/redux/actions/student/student_publications'
import { connect } from 'react-redux'

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
  const [contract, setContract] = React.useState({})
  const [activeStep, setActiveStep] = React.useState(0)
  const [idTutor, setIdTutor] = React.useState(null)
  const steps = getSteps()
  const { loading, tutor } = props

  useEffect(
    () => {
      if (idTutor != null) {
        props.getTutorSelectedInfo(idTutor)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idTutor]
  )

  const handleNext = () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNomination = (nomination) => {
    setContract({ ...contract, nomination: nomination })
    setIdTutor(nomination.tutor)
    handleNext()
  }

  const handleTutor = (tutor) => {
    setContract({ ...contract, tutor: tutor })
    handleNext()
  }

  const handleSchedule = (slot) => {
    setContract({ ...contract, slot: slot })
    handleNext()
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
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                {activeStep === 0 ? (
                  <NominationsView
                    key={publication.id}
                    id={publication.id}
                    publication={publication}
                    next={handleNomination}
                  />
                ) : (
                  <></>
                )}
                {activeStep === 1 ? (
                  loading ? (
                    <ProfileViewSkeleton />
                  ) : (
                    <ProfileView tutor={tutor} />
                  )
                ) : (
                  <></>
                )}
                {activeStep === 2 ? <Schedule next={handleSchedule} /> : <></>}
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
                              src="/static/images/avatars/avatar_6.png"
                            />
                          </Box>
                          <Box>
                            <Typography>
                              <b>Tutor:</b> {contract.tutor.user.first_name}{' '}
                              {contract.tutor.user.last_name}
                            </Typography>
                            <Typography>
                              <b>Precio:</b> {contract.nomination.price}$
                            </Typography>
                            <Typography>
                              <b>Franja:</b> {contract.slot.day} de{' '}
                              {contract.slot.start <= 12
                                ? contract.slot.start
                                : contract.slot.start - 12}{' '}
                              {contract.slot.start < 12 ? 'am' : 'pm'} a{' '}
                              {contract.slot.end <= 12
                                ? contract.slot.end
                                : contract.slot.end - 12}{' '}
                              {contract.slot.end < 12 ? 'am' : 'pm'}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                    <Box className={classes.nextButton}>
                      <form
                        method="post"
                        action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu">
                        <input name="merchantId" type="hidden" value={508029} />
                        <input name="accountId" type="hidden" value={512321} />
                        <input
                          name="ApiLogin"
                          type="hidden"
                          value="pRRXKOl8ikMmt9u"
                        />
                        <input
                          name="description"
                          type="hidden"
                          value="Test PAYU"
                        />
                        <input
                          name="referenceCode"
                          type="hidden"
                          value="TestPayU"
                        />
                        <input name="amount" type="hidden" value={3} />
                        <input name="tax" type="hidden" value={0} />
                        <input name="taxReturnBase" type="hidden" value={0} />
                        <input name="currency" type="hidden" value="COP" />
                        <input
                          name="signature"
                          type="hidden"
                          value="ba9ffa71559580175585e45ce70b6c37"
                        />
                        <input name="test" type="hidden" value="1" />
                        <input
                          name="buyerEmail"
                          type="hidden"
                          value="test@test.com"
                        />
                        <input
                          name="responseUrl"
                          type="hidden"
                          value="http://www.test.com/response"
                        />
                        <input
                          name="confirmationUrl"
                          type="hidden"
                          value="http://www.test.com/confirmation"
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit">
                          Ir al pago
                        </Button>
                      </form>
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
                onClick={() => handleTutor(tutor)}
                className={classes.button}>
                {activeStep === 1  ? 'Siguiente' : 'Ir al pago'}
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

const mapStateToProps = (state) => ({
  tutor: state.publications.tutorInfo,
  loading: state.publications.loadingTutor
})

export default connect(mapStateToProps, {
  getTutorSelectedInfo
})(TutorSelectionView)

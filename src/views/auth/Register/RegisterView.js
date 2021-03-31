//REACT
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//REDUX
import { addUser } from '../../../redux/actions/auth'
import { connect } from 'react-redux'

//COMPONENTS MATERIAL UI
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  makeStyles,
  TextField,
  Typography,
  Dialog
} from '@material-ui/core'

//COMPONENTS
import Page from '../../../components/Page'
import RoleCard from '../../../components/RoleCard'
import SignInGoogle from '../../../components/SignGoogle'

import { Formik } from 'formik'

//UTILS
import Validation from './formikValues'
import LoginHooks from '../../../components/SignGoogleHooks'
import TermsAndConditions from '../../../components/TermsDialog'

//STYLESS
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
  terms: {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}))

const RegisterView = ({ isAuthenticated, addUser }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [tutorSelect, setTutorSelect] = useState(false)
  const [studentSelect, setStudentSelect] = useState(false)
  let navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/tutor')
  })

  const selectRole = (role) => {
    if (role === 'tutor') {
      if (!tutorSelect) {
        setTutorSelect(true)
        setStudentSelect(false)
      }
    } else if (role === 'student') {
      if (!studentSelect) {
        setTutorSelect(false)
        setStudentSelect(true)
      }
    }
  }

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={Validation.initialValues}
            validationSchema={Validation.validation}
            //ON_SUBMIT ENVIO DEL FORMULARIO
            onSubmit={(values) => {
              if (tutorSelect) {
                // tutor registration api
                console.log('registro de tutor...')
                let jsonValues = Validation.getValues(values)
                addUser(jsonValues)
              } else if (studentSelect) {
                // student registration api
                console.log('registro de estudiante...')
              } else {
                console.log('Debe elegir un rol')
              }
            }}>
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3} textAlign="center">
                  <Typography color="textPrimary" variant="h2">
                    INSCRIBETE
                  </Typography>
                </Box>
                <Box display="flex" textAlign="center" justifyContent="center">
                  <div onClick={(e) => selectRole('student')}>
                    <RoleCard role="ESTUDIANTE" isSelected={studentSelect} />
                  </div>
                  <div onClick={(e) => selectRole('tutor')}>
                    <RoleCard role="TUTOR" isSelected={tutorSelect} />
                  </div>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <TextField
                    id="txt_name"
                    className={classes.text}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    label="Nombre"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    variant="outlined"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  <TextField
                    id="txt_lastname"
                    className={classes.text}
                    error={Boolean(touched.lastname && errors.lastname)}
                    helperText={touched.lastname && errors.lastname}
                    label="Apellido"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="lastname"
                    value={values.lastname}
                    variant="outlined"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    id="txt_email"
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Correo electrónico"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    id="text_password"
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Contraseña"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    id="txt_confirmPassword"
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    fullWidth
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label="Confirmar Contraseña"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    variant="outlined"
                  />
                </Box>
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    id="checkboxPolicy"
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    He leído los&nbsp;
                    <span className={classes.terms} onClick={handleClickOpen}>
                      términos y condiciones
                    </span>
                  </Typography>
                  <Dialog open={open} onClose={handleClose} scroll="paper">
                    {<TermsAndConditions handleDialogClose={handleClose} />}
                  </Dialog>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error> {errors.policy} </FormHelperText>
                )}
                <Box my={1}>
                  <Button
                    id="btn_registerUser"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="medium"
                    type="submit"
                    variant="contained">
                    Registrarse
                  </Button>
                </Box>
                <Box textAlign="center" mb={1}>
                  ó
                </Box>
                {/*<Box width="sm">
                  <LoginHooks />
                </Box>*/}
                <Box my={3}>
                  <SignInGoogle></SignInGoogle>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {
  addUser
})(RegisterView)

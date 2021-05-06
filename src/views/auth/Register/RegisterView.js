//REACT
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//REDUX
import { connect } from 'react-redux'
import store from 'src/redux/store'
import { addTutor, addStudent } from 'src/redux/actions/auth'
import { launchAlert } from 'src/redux/actions/alerts'

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

const RegisterView = ({ isAuthenticated, addTutor, addStudent }) => {
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
              let jsonValues = Validation.getValues(values)
              if (tutorSelect) {
                addTutor(jsonValues)
              } else if (studentSelect) {
                addStudent(jsonValues)
              } else {
                store.dispatch(launchAlert('Debes seleccionar un rol', 1))
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
              <form data-testid="register-form" onSubmit={handleSubmit}>
                <Box mb={3} textAlign="center">
                  <Typography color="textPrimary" variant="h2">
                    INSCRIBETE
                  </Typography>
                </Box>
                <Box display="flex" textAlign="center" justifyContent="center">
                  <div
                    data-testid="student"
                    onClick={(e) => selectRole('student')}>
                    <RoleCard role="ESTUDIANTE" isSelected={studentSelect} />
                  </div>
                  <div data-testid="tutor" onClick={(e) => selectRole('tutor')}>
                    <RoleCard role="TUTOR" isSelected={tutorSelect} />
                  </div>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <TextField
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
                    inputProps={{
                      'data-testid': 'firstname'
                    }}
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  <TextField
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
                    inputProps={{
                      'data-testid': 'lastname'
                    }}
                    InputProps={{
                      className: classes.input
                    }}
                  />
                </Box>
                <Box>
                  <TextField
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
                    inputProps={{
                      'data-testid': 'email'
                    }}
                  />
                </Box>
                <Box>
                  <TextField
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
                    inputProps={{
                      'data-testid': 'password'
                    }}
                  />
                </Box>
                <Box>
                  <TextField
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
                    inputProps={{
                      'data-testid': 'confirmPassword'
                    }}
                  />
                </Box>
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    aria-checked={values.policy}
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                    inputProps={{
                      'data-testid': 'checkboxPolicy'
                    }}
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
                    color="primary"
                    data-testid="btn-register"
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
                <Box width="sm">
                  <LoginHooks
                    tutorSelect={tutorSelect}
                    studentSelect={studentSelect}
                  />
                </Box>
                {/* <Box my={3}>
                  <SignInGoogle></SignInGoogle>
                </Box> */}
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
  addTutor,
  addStudent
})(RegisterView)

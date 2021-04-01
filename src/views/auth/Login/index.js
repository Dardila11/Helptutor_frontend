//REACT
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//REDUX
import { login } from '../../../redux/actions/auth'
import { connect } from 'react-redux'

//COMPONENTS MATERIAL UI
import {
  Box,
  Button,
  Container,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'

//COMPONENTS
import Page from '../../../components/Page'
import SignInGoogle from '../../../components/SignGoogle'

import { Formik } from 'formik'

//UTILS
import Validation from './formikValues'
import SignGoogleHooks from '../../../components/SignGoogleHooks'

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
  }
}))

const LoginView = (props) => {
  const classes = useStyles()
  let navigate = useNavigate()

  useEffect(() => {
    if (props.isAuthenticated) navigate('/tutor')
    else navigate('/login')
  }, [props.isAuthenticated])

  return (
    <Page className={classes.root} title="Login">
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
              console.log(jsonValues)
              props.login(jsonValues)
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
                    Iniciar Sesión
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between">
                  <TextField
                    id="txt_email"
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    variant="outlined"
                  />
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
                <Box my={2} mb={1}>
                  <Button
                    id="btn_login"
                    color="primary"
                    fullWidth
                    size="medium"
                    type="submit"
                    variant="contained">
                    Iniciar Sesión
                  </Button>
                </Box>
                <Box textAlign="center"> ó </Box>
                <Box my={1}>
                  <SignGoogleHooks login={true} />
                  {/* <SignInGoogle login={true}></SignInGoogle> */}
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
  login
})(LoginView)

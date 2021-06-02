//REACT
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//REDUX
import { login, selectRole } from 'src/redux/actions/auth'
import { connect } from 'react-redux'

//COMPONENTS MATERIAL UI
import {
  Box,
  Button,
  Card,
  Container,
  Link,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'

//COMPONENTS
import Page from 'src/components/Page'
import SignGoogleHooks from 'src/components/SignGoogleHooks'

import { Formik } from 'formik'

//UTILS
import Validation from './formikValues'

//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
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
  register: {
    marginTop: theme.spacing(2)
  },
  card:{
    padding: theme.spacing(4)
  }
}))

const LoginView = (props) => {
  const classes = useStyles()
  let navigate = useNavigate()

  useEffect(
    () => {
      if (props.auth.isAuthenticated) {
        if (props.auth.isStudent && props.auth.isTutor) {
          navigate('/seleccion-rol')
          return
        }
        if (props.auth.isStudent) {
          props.selectRole('student')
          navigate('/estudiante')
          return
        } else {
          props.selectRole('tutor')
          navigate('/tutor')
          return
        }
      } else navigate('/login')
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.auth.isAuthenticated]
  )

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center">
        <Card className={classes.card}>
        <Container maxWidth="sm">
          <Formik
            initialValues={Validation.initialValues}
            validationSchema={Validation.validation}
            //ON_SUBMIT ENVIO DEL FORMULARIO
            onSubmit={(values) => {
              let jsonValues = Validation.getValues(values)
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
        <Container className={classes.register} align="center">
          <Typography>
            ¿No tienes una cuenta?,
            <Link href="./registrar">haz click aqui para registrate</Link>
          </Typography>
        </Container>
        </Card>
      </Box>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  selectRole,
  login
})(LoginView)

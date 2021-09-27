import React from 'react'

// context
import { loginUser, useAuthDispatch } from 'src/context'

// components
import Page from 'src/components/Page'
import SignGoogleHooks from 'src/components/SignGoogleHooks'

// formik
import { Formik } from 'formik'

// routing
import { useNavigate } from 'react-router-dom'

// redux
import { connect } from 'react-redux'
import { login, selectRole } from 'src/redux/actions/auth'

// utils
import Validation from './formikValues'
import { toast } from 'react-toastify'

// styles
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark
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
  card: {
    padding: theme.spacing(4)
  }
}))

const LoginView = (props) => {
  const classes = useStyles()
  let navigate = useNavigate()
  const dispatch = useAuthDispatch()

  async function submit(values) {
    let jsonValues = Validation.getValues(values)
    const response = await loginUser(dispatch, jsonValues, false)
    if (!response.user) return
    if (response.roles[0] && response.roles[1]) navigate('/seleccion-rol')
    if (response.roles[0] && !response.roles[1]) navigate('/tutor')
    if (!response.roles[0] && response.roles[1]) navigate('/estudiante')
    toast.success('Bienvenido ' + response.user.first_name)
  }

  return (
    <Page className={classes.root} title="Iniciar sesión">
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Card className={classes.card}>
          <Container maxWidth="sm">
            <Formik
              initialValues={Validation.initialValues}
              validationSchema={Validation.validation}
              //ON_SUBMIT ENVIO DEL FORMULARIO
              onSubmit={(values) => submit(values)}>
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
                    <Typography color="textPrimary" variant="h3">
                      INICIAR SESIÓN
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
                      label="Correo electrónico"
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
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
          <Container className={classes.register} align="center">
            <Typography>
              {'¿No tienes una cuenta?, '}
              <Link href="./registrar">haz click aquí para registrate</Link>
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

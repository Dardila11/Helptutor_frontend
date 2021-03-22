//REACT
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//REDUX

//ALERT
import { useAlert } from 'react-alert'

//COMPONENTS MATERIAL UI
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'

//COMPONENTS
import Page from '../../components/Page'
import RoleCard from '../../components/RoleCard'
import SignInGoogle from '../../components/SignGoogle'

import { Formik } from 'formik'

//UTILS
import Api from '../../services/Api'

import Validation from './formikValues'

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

const RegisterView = () => {
  //DEFINED CONST, VAR AND LET
  const classes = useStyles()
  const alert = useAlert()
  let navigate = useNavigate()

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
              //LLAMADO DEL API REGISTRAR TUTOR
              Api.postTutor(jsonValues).then((res) => {
                if (res.status === 200) {
                  alert.show('Registro exitoso', { type: 'success' })
                  navigate('/tutor/manageknowledgeArea')
                }
              })
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
                  <RoleCard role="ESTUDIANTE" isSelected={values.isStudent} />
                  <RoleCard role="TUTOR" isSelected={values.isTutor} />
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
                    He leído los términos y condiciones
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error> {errors.policy} </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    id="btn_registerUser"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    Registrarse
                  </Button>
                </Box>
                <Box my={2}>
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

export default RegisterView

import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  TextField,
  Typography,
  Select,
  makeStyles,
  InputLabel,
  FormControl,
  MenuItem
} from '@material-ui/core'
import Page from '../../components/Page'
import allCountries from 'all-countries'
import SignInGoogle from '../../components/SignGoogle'
import Api from '../../services/Api'

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
  }
}))

const RegisterView = () => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      await Api.getCountries().then(res => {
        console.log(res.data)
        setCountries(res.data)
      })
    }
    fetchData()
  }, [])
  const classes = useStyles()

  const postData = async (values) => {
    let jsonValues = {
      first_name: values.name,
      email: values.email,
      country: values.country,
      telephone: values.phone,
      password: values.password,      
    }
    console.log(jsonValues);
     Api.postTutor(jsonValues)
      .then(res => {
        if (res.status == 201) {
          console.log(res.status)
        }
      })
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
            initialValues={{
              name: '',
              email: '',
              country: '',
              phone: '',
              password: '',
              confirmPassword: '',
              policy: false
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required('Nombre es requerido'),
              email: Yup.string()
                .email('Debe ser un email valido')
                .max(255)
                .required('Correo Electrónico es requerido'),
              country: Yup.string().max(255).required('Pais es requerido'),
              phone: Yup.string().max(255).required('Teléfono es requerido'),
              password: Yup.string()
                .max(255)
                .required('Contraseña es requerido'),
              confirmPassword: Yup.mixed()
                .test('iguales', 'Contraseñas no son iguales', function () {
                  return this.parent.password === this.parent.confirmPassword
                })
                .required('Contraseña es requerido'),
              policy: Yup.boolean().oneOf(
                [true],
                'Este campo debe ser aceptado'
              )
            })}
            onSubmit={(values) => {
              /* 
              1. call api
              2. Check whether is a valid user
              3. show message
              4. Navigate to login page. navigate('/tutor', { replace: true });
            */
              console.log('Registrando')
              console.log(values)
              let jsonValues = {
                first_name: values.name,
                email: values.email,
                country: values.country,
                telephone: values.phone,
                password: values.password,      
              }
              console.log(jsonValues);
               Api.postTutor(jsonValues)
                .then(res => {
                  if (res.status == 201) {
                    console.log(res.status)
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
                    Crear cuenta
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Nombre"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="name"
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Correo Electrónico"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  variant="outlined"
                />
                <FormControl
                  variant="outlined"
                  className={classes.selectControl}
                  error={Boolean(touched.country && errors.country)}
                  helpertext={touched.country && errors.country}
                  onBlur={handleBlur}
                  fullWidth>
                  <InputLabel id="select-country-label"> Pais </InputLabel>
                  <Select
                    labelId="select-country-label"
                    id="select-country"
                    value={values.country}
                    name="country"
                    onChange={handleChange}
                    label="Pais">
                    <MenuItem value="">
                      <em>---</em>
                    </MenuItem>
                    {countries.map((country, index) => (
                      <MenuItem key={index} value={country}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(touched.country && errors.country) && (
                    <FormHelperText error> {errors.country} </FormHelperText>
                  )}
                </FormControl>
                {/* <TextField
                  error={Boolean(touched.country && errors.country)}
                  fullWidth
                  helperText={touched.country && errors.country}
                  label="Pais"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="country"
                  value={values.country}
                  variant="outlined"
                /> */}
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Teléfono"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="phone"
                  value={values.phone}
                  variant="outlined"
                />
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
                />
                <TextField
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Confirmar Contraseña"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  variant="outlined"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    He leido los terminos y condiciones
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error> {errors.policy} </FormHelperText>
                )}
                <Box my={2}>
                  <Button
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

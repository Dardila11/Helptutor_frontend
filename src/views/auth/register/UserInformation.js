import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Checkbox,

  FormHelperText,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'

import SignInGoogle from '../../../components/SignGoogle'
import Api from '../../../services/Api'

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

const UserInformation = () => {
  const classes = useStyles()
  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        policy: false,
        isStudent: true,
        isTutor: false
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Nombre es requerido'),
        lastname: Yup.string().max(255).required('Apellido es requerido'),
        email: Yup.string()
          .email('Debe ser un email valido')
          .test('Valido', 'Email debe ser @unicauca.edu.co', function () {
            if (this.parent.email !== undefined) {
              var email = this.parent.email.toLowerCase()
              if (email !== '') {
                return email.substr(email.length - 15) === 'unicauca.edu.co'
              }
            }
          })
          .max(255)
          .required('Correo Electrónico es requerido'),
        phone: Yup.string().max(255).required('Teléfono es requerido'),
        password: Yup.string().max(255).required('Contraseña es requerido'),
        confirmPassword: Yup.mixed()
          .test('iguales', 'Contraseñas no son iguales', function () {
            return this.parent.password === this.parent.confirmPassword
          })
          .required('Contraseña es requerido'),
        policy: Yup.boolean().oneOf([true], 'Este campo debe ser aceptado')
      })}
      onSubmit={(values) => {
        let jsonValues = {
          first_name: values.name,
          last_name: values.lastname,
          email: values.email,
          country: values.country,
          telephone: values.phone,
          password: values.password
        }
        console.log(jsonValues)
        Api.postTutor(jsonValues).then((res) => {
          if (res.status === 201) {
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
              INSCRIBETE
            </Typography>
          </Box>
          {/* <Box display="flex" textAlign="center" justifyContent="center">
            <RoleCard role="ESTUDIANTE" isSelected={values.isStudent} />
            <RoleCard role="TUTOR" isSelected={~values.isTutor} />
          </Box> */}
          <Box display="flex" justifyContent="space-between">
            <TextField
              id="txt_name"
              className={classes.text}
              error={Boolean(touched.name && errors.name)}
              maxWidth={true}
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
              maxWidth={true}
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
          <TextField
            id="txt_email"
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
          {/* <FormControl
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
          </FormControl> */}
          <TextField
            id="text_phone"
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
          <TextField
            id="txt_confirmPassword"
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
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
              id="checkboxPolicy"
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
  )
}

export default UserInformation

import React from 'react'
import { Box, Typography, TextField, Button, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Formik } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(7),
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '20px'
  }
}))

const EditInfoView = () => {
  /**
   * get user info after component is loaded
   */
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            interests: '', //change name
            methodology: '',
            skills: '',
            sex: '',
            birthday: '',
            email: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Nombre es requerido'),
            email: Yup.string()
              .email('Debe ser un email valido')
              .max(255)
              .required('Correo Electrónico es requerido'),
            country: Yup.string().max(255).required('Pais es requerido'),
            phone: Yup.string().max(255).required('Teléfono es requerido'),
            password: Yup.string().max(255).required('Contraseña es requerido'),
            confirmPassword: Yup.mixed()
              .test('iguales', 'Contraseñas no son iguales', function () {
                return this.parent.password === this.parent.confirmPassword
              })
              .required('Contraseña es requerido')
          })}
          onSubmit={(values) => {
            console.log('onSubmit called')
            let jsonValues = {
              username: 'get this from localstorage ?',

              first_name: 'firstname',
              last_name: 'lastname',
              interests: 'interests',
              methodology: 'methodology',
              skills: 'skills',
              gender: 'sex',
              birthday: 'birthday',
              email: 'email'
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
                  INFORMACIÓN
                </Typography>
              </Box>
              <Box>
                <TextField
                  error={Boolean(touched.first_name && errors.first_name)}
                  fullWidth
                  helperText={touched.first_name && errors.first_name}
                  label="Nombre"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="first_name"
                  value={values.first_name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.last_name && errors.last_name)}
                  fullWidth
                  helperText={touched.last_name && errors.last_name}
                  label="Apellido"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="last_name"
                  value={values.last_name}
                  variant="outlined"
                />
              </Box>
              <TextField
                error={Boolean(touched.interests && errors.interests)}
                fullWidth
                helperText={touched.interests && errors.interests}
                label="Mis intereses"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                name="interests"
                value={values.interests}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.methodology && errors.methodology)}
                fullWidth
                helperText={touched.methodology && errors.methodology}
                label="Metodología"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                name="methodology"
                value={values.methodology}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.skills && errors.skills)}
                fullWidth
                helperText={touched.skills && errors.skills}
                label="Habilidades"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                name="skills"
                value={values.skills}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.sex && errors.sex)}
                fullWidth
                helperText={touched.sex && errors.sex}
                label="Sexo"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                name="sex"
                value={values.sex}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.birthday && errors.birthday)}
                fullWidth
                helperText={touched.birthday && errors.birthday}
                label="Fecha de Nacimiento"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                type="date"
                name="birthday"
                id="date"
                value={values.birthday}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
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
                type="email"
                value={values.email}
                variant="outlined"
                disabled
              />
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained">
                  GUARDAR
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Card>
  )
}

export default EditInfoView

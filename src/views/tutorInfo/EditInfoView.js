import React from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Formik } from 'formik'
import Page from '../../components/Page'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '20px'
  }
}))

const EditInfoView = () => {
  const classes = useStyles()
  return (
    <Page>
      <Card className={classes.root}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                name: '',
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
                password: Yup.string()
                  .max(255)
                  .required('Contraseña es requerido'),
                confirmPassword: Yup.mixed()
                  .test('iguales', 'Contraseñas no son iguales', function () {
                    return this.parent.password === this.parent.confirmPassword
                  })
                  .required('Contraseña es requerido')
              })}
              onSubmit={() => {
                console.log('onSubmit called')
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
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Nombre Completo"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    variant="outlined"
                  />
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
          </Container>
        </Box>
      </Card>
    </Page>
  )
}

export default EditInfoView

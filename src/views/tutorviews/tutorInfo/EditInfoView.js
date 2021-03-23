import React from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Formik } from 'formik'
import * as Yup from 'yup'

//REDUX
import { updateTutor } from '../../../redux/actions/auth'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(7),
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '20px'
  },
  selectControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}))

const EditInfoView = ({ updateTutor }) => {
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
          /* validationSchema={Yup.object().shape({
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
          })} */
          onSubmit={(values) => {
            console.log('onSubmit called')
            let jsonValues = {
              //username: 'get this from localstorage ?',
              first_name: values.first_name,
              last_name: values.last_name,
              interest: values.interests,
              methodology: values.methodology,
              skills: values.skills,
              gender: values.sex,
              birthday: values.birthday,
              email: values.email
            }
            console.log(jsonValues)
            updateTutor(9, jsonValues)
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
                  id="txt_firstname"
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
                  id="txt_lastname"
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
                id="txt_interests"
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
                id="txt_methodology"
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
                id="txt_skills"
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
              <FormControl
              variant="outlined"
              className={classes.selectControl}
              error={Boolean(touched.sex && errors.sex)}
              helpertext={touched.sex && errors.sex}
              fullWidth>
                <InputLabel id="select-sex-label"> Género </InputLabel>
                <Select
                labelId="select-sex-label"
                id="select_sex"
                value={values.sex}
                name="sex"
                onChange={handleChange}
                label="Género"
                >
                  <MenuItem value="">--</MenuItem>
                  <MenuItem key={1} value={1}>Masculino</MenuItem>
                  <MenuItem key={2} value={2}>Femenino</MenuItem>
                  <MenuItem key={3} value={3}>Otro</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="txt_birthday"
                error={Boolean(touched.birthday && errors.birthday)}
                fullWidth
                helperText={touched.birthday && errors.birthday}
                label="Fecha de Nacimiento"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                type="date"
                name="birthday"
                value={values.birthday}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
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
                type="email"
                value={values.email}
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  id="btn_updateTutor"
                  color="primary"
                  //disabled={isSubmitting}
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

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {
  updateTutor
})(EditInfoView)

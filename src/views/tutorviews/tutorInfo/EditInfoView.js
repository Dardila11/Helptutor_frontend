import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  LinearProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Formik } from 'formik'
import formikValues from './formikValues'

//REDUX
import { getTutorInfo, updateTutor } from 'src/redux/actions/tutor/tutor_data'

import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    padding: '20px',
    borderRadius: '20px'
  },
  selectControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  progress: {
    marginTop: theme.spacing(5),
    float: 'center'
  },
  inputs: {
    '& > *': {
      marginRight: theme.spacing(2)
    },
    '& >:last-child': {
      marginRight: 0
    }
  }
}))

const EditInfoView = (props) => {
  const { updateTutor, getTutorInfo, userInfo, requestInProgress } = props
  const [initialInfo, setInitialInfo] = useState(formikValues.initialValues)
  const [loading, setLoading] = useState(true)

  useEffect(
    () => {
      getTutorInfo(props.user.id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  
  useEffect(() => {
    setLoading(requestInProgress)
  }, [requestInProgress])

  useEffect(() => {
    setInitialInfo(userInfo)
  }, [userInfo])

  const classes = useStyles()
  return (
    loading? (
      <>
        <LinearProgress />
      </>
    ) : (
        <Card className={classes.root}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Formik
            enableReinitialize
            initialValues={initialInfo}
            //validationSchema={formikValues.validation}
            onSubmit={(values) => {
              let jsonValues = formikValues.getValues(values)
              updateTutor(jsonValues)
            }}>
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3} textAlign="center">
                  <Typography color="textPrimary" variant="h4">
                    INFORMACIÓN
                  </Typography>
                </Box>
                <Box className={classes.inputs} display="flex">
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
                <Box className={classes.inputs} display="flex">
                  <FormControl
                    variant="outlined"
                    className={classes.selectControl}
                    error={Boolean(touched.gender && errors.gender)}
                    helpertext={touched.gender && errors.gender}
                    fullWidth>
                    <InputLabel id="select-gender-label"> Género </InputLabel>
                    <Select
                      labelId="select-gender-label"
                      id="select_gender"
                      value={values.gender}
                      name="gender"
                      onChange={handleChange}
                      label="Género">
                      <MenuItem key={3} value={3}>
                        --
                      </MenuItem>
                      <MenuItem key={0} value={0}>
                        Femenino
                      </MenuItem>
                      <MenuItem key={1} value={1}>
                        Masculino
                      </MenuItem>
                      <MenuItem key={2} value={2}>
                        Otro
                      </MenuItem>
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
                    disabled
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
                </Box>
                <Box className={classes.inputs} display="flex">
                  <TextField
                    id="txt_interests"
                    error={Boolean(touched.interest && errors.interest)}
                    fullWidth
                    helperText={touched.interest && errors.interest}
                    label="Mis intereses"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="interest"
                    value={values.interest}
                    multiline={true}
                    rows={5}
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
                    multiline={true}
                    rows={5}
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
                    multiline={true}
                    rows={5}
                    variant="outlined"
                  />
                </Box>

                <Box my={2}>
                  <Button
                    id="btn_updateTutor"
                    color="primary"
                    //disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    Actualizar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Card>
    )
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userInfo: state.tutorInfo.userInfo,
  requestInProgress: state.tutorInfo.requestInProgress
})

export default connect(mapStateToProps, {
  getTutorInfo,
  updateTutor
})(EditInfoView)

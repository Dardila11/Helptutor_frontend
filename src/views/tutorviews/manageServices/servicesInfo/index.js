//REACT
import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'

import Api from '../../../../services/Api'

//COMPONENTS MATERIAL UI
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core'

import SaveIcon from '@material-ui/icons/Save'

import { Formik } from 'formik'

import {getSpecialitiesTutor} from '../../../../redux/actions/services'

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
  containerTitle: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  infoView: {
    borderRadius: '20px'
  },
  button: {
    background: theme.palette.button.primary,
    color: theme.palette.common.white
  }
}))

let initialValuesObj = {
  title: '',
  speciality: -1,
  description: '',
  price: ''
}

const ServicesInfoView = (props) => {
  const classes = useStyles()

  useEffect(() => {
    props.getSpecialitiesTutor(props.user.id)
  })
  return (
    <>
      <Grid item xs={9}>
        <Paper className={classes.infoView} elevation={3}>
          <Card className={classes.infoView}>
            <Typography
              className={classes.containerTitle}
              variant="h4"
              align="center">
              Información del Servicio
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center">
              <Container maxWidth="sm">
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValuesObj}
                  validationSchema={Validation.validation}
                  onSubmit={(values) => {
                    let jsonValues = Validation.getValues({
                      ...values,
                      user: props.user.id
                    })
                    if (props.is_create) props.addSpecialityTutor(jsonValues)
                    else
                      props.updateSpecialityTutor(
                        jsonValues,
                        props.speciality_tutor.id
                      )
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
                      <TextField
                        id="txt_title"
                        error={Boolean(touched.title && errors.title)}
                        fullWidth
                        helperText={touched.title && errors.title}
                        label="Titulo"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="title"
                        value={values.title}
                        variant="outlined"
                        InputProps={{
                          className: classes.input
                        }}
                      />
                      <FormControl
                        variant="outlined"
                        className={classes.selectControl}
                        error={Boolean(touched.speciality && errors.speciality)}
                        helpertext={touched.speciality && errors.speciality}
                        fullWidth>
                        <InputLabel id="select-subarea-label">
                          Especialidad
                        </InputLabel>
                        <Select
                          labelId="select-subarea-label"
                          id="select-subarea"
                          value={values.speciality}
                          name="speciality"
                          onChange={handleChange}
                          label="Especialidad">
                          <MenuItem value={-1}>
                            <em>---</em>
                          </MenuItem>
                          {props.specialities.map((subarea, index) => (
                            <MenuItem key={index} value={subarea.knowledge_area.id}>
                              {subarea.knowledge_area.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {Boolean(touched.speciality && errors.speciality) && (
                          <FormHelperText error>
                            {errors.speciality}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <TextField
                        id="txt_description"
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label="Descripción"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="description"
                        value={values.description}
                        variant="outlined"
                      />
                       <TextField
                        id="txt_price"
                        error={Boolean(
                          touched.price && errors.price
                        )}
                        fullWidth
                        helperText={touched.price && errors.price}
                        label="Precio $"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="price"
                        value={values.price}
                        variant="outlined"
                      />
                      <Box my={2} align="center">
                        <Button
                          id="btn_registerService"
                          className={classes.button}
                          type="submit"
                          endIcon={<SaveIcon />}
                          variant="contained">
                          {props.is_create ? 'Guardar Servicio' : 'Actualizar'}
                        </Button>
                      </Box>
                      <Box my={2}></Box>
                    </form>
                  )}
                </Formik>
              </Container>
            </Box>
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  specialities : state.services.specialities_tutor,
  is_create: state.services.is_create
})

export default connect(mapStateToProps, {
  getSpecialitiesTutor
})(ServicesInfoView)

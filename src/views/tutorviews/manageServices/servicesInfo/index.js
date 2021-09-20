//REACT
import React from 'react'

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

//UTILS
import formikValues from './formikValues'
import useTutorKnowledgeAreas from 'src/hooks/TutorHooks/useTutorKnowledgeArea'

//STYLESS
const useStyles = makeStyles((theme) => ({
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

const ServicesInfoView = ({service, user}) => {
  const classes = useStyles()
  const { data, isLoading } = useTutorKnowledgeAreas(user.id)
  if(service!=null) formikValues.putValues(service)

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
                  initialValues={formikValues.initialValues}
                  validationSchema={formikValues.validation}
                  onSubmit={(values) => {
                    let jsonValues = formikValues.getValues()
                    console.log(jsonValues)
                    //TODO POST AND PUT
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
                          {isLoading? '' :
                            (
                              data.map((subarea, index) => (
                                <MenuItem key={index} value={subarea.id}>
                                  {subarea.knowledge_area.name}
                                </MenuItem>
                            )
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
                        error={Boolean(touched.price && errors.price)}
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
                          {service===null ? 'Guardar Servicio' : 'Actualizar'}
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

export default ServicesInfoView

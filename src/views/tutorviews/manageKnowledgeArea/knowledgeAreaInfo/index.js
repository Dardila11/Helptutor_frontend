//REACT
import React, { useEffect } from 'react'

//REDUX
import {
  getKnowledgeAreas,
  getSpecialities,
  AddSpecialityTutor
} from '../../../../redux/actions/knowledge_areas'
import { connect } from 'react-redux'

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

//COMPONENTS
import SupportsView from './supports'

import { Formik } from 'formik'
import { isUndefined } from 'lodash-es'

//UTILS
import * as Yup from 'yup'
import Api from '../../../../services/Api'

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
  }
}))

const KnowledgeAreaInfoView = (props) => {
  const classes = useStyles()
  const {knowledge_areas, specialities, getKnowledgeAreas} = props;
  let option = false
  let initialvalues = {}

  if (isUndefined(props.area)) {
    //option = true
    initialvalues = {
      area: '',
      subarea: '',
      description: '',
      tags: ''
    }
    console.log('area undefined')
  } else {
    console.log('area defined')
    initialvalues = {
      area: '',
      subarea: '',
      description: props.area.description,
      tags: props.area.tags
    }
  }

  useEffect(() => {
    getKnowledgeAreas()
  }, [])

  const handleSelect = (e) => {
    props.getSpecialities(e.target.value.id)
  }

  return (
    <>
      <Grid item xs={9}>
        <Paper className={classes.infoView} elevation={3}>
          <Card>
            <Typography
              className={classes.containerTitle}
              variant="h3"
              align="center">
              Información del Área de Conocimiento
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center">
              <Container maxWidth="sm">
                <Formik
                  initialValues={initialvalues}
                  validationSchema={Yup.object().shape({
                    area: Yup.string().max(255).required('Area requerida'),
                    subarea: Yup.string()
                      .max(255)
                      .required('Sub area requerida'),
                    description: Yup.string().max(255),
                    tags: Yup.string().max(255)
                  })}
                  onSubmit={(values) => {
                    console.log(values)
                    let jsonValues = {
                      tags: values.tags,
                      description: values.description,
                      knowledge_area: values.subarea.id,
                      user: 12
                    }
                    console.log(jsonValues)
                    props.AddSpecialityTutor(jsonValues)
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
                      <FormControl
                        variant="outlined"
                        className={classes.selectControl}
                        error={Boolean(touched.area && errors.area)}
                        helpertext={touched.area && errors.area}
                        fullWidth>
                        <InputLabel id="select-area-label"> Área de conocimiento</InputLabel>
                        <Select
                          labelId="select-area-label"
                          id="select-area"
                          value={values.area}
                          name="area"
                          onChange={(e) => {
                            handleChange(e)
                            handleSelect(e)
                          }}
                          label="Área de conocimiento">
                          <MenuItem value="">
                            <em>---</em>
                          </MenuItem>
                          {knowledge_areas.map((area, index) => (
                            <MenuItem key={index} value={area}>
                              {area.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {Boolean(touched.area && errors.area) && (
                          <FormHelperText error> {errors.area} </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        variant="outlined"
                        className={classes.selectControl}
                        error={Boolean(touched.subarea && errors.subarea)}
                        helpertext={touched.subarea && errors.subarea}
                        fullWidth>
                        <InputLabel id="select-subarea-label">
                          Especialidad
                        </InputLabel>
                        <Select
                          labelId="select-subarea-label"
                          id="select-subarea"
                          value={values.subarea}
                          name="subarea"
                          onChange={handleChange}
                          label="Especialidad">
                          <MenuItem value="">
                            <em>---</em>
                          </MenuItem>
                          {specialities.map((subarea, index) => (
                            <MenuItem key={index} value={subarea}>
                              {subarea.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {Boolean(touched.subarea && errors.subarea) && (
                          <FormHelperText error>
                            {' '}
                            {errors.subarea}{' '}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <TextField
                        id="txt_tags"
                        error={Boolean(touched.tags && errors.tags)}
                        fullWidth
                        helperText={touched.tags && errors.tags}
                        label="Etiquetas, describa palabras clave separadas por coma(,)"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="tags"
                        value={values.tags}
                        variant="outlined"
                        InputProps={{
                          className: classes.input
                        }}
                      />
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
                      <SupportsView></SupportsView>
                      <Box my={2}>
                        <Button
                          id="btn_registerArea"
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained">
                          Registrar Área de conocimiento
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
  knowledge_areas: state.knowledge_areas.knowledge_areas,
  specialities: state.knowledge_areas.specialities
})

export default connect(mapStateToProps, {
  getKnowledgeAreas,
  getSpecialities,
  AddSpecialityTutor
})(KnowledgeAreaInfoView)

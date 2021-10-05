//REACT
import React, { useState, useEffect } from 'react'

//COMPONENTS MATERIAL UI
import {
  Box,
  Button,
  Card,
  Chip,
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

//COMPONENTS
import CertificateView from './certificates/certificate'

import { Formik, useFormik } from 'formik'

//UTILS
import formikValues from './formikValues'

import {
  useKnowledgeAreas,
  fetchSubKnowledgeAreas
} from 'src/hooks/useKnowledgeAreas'
import { useUpdateKnowledgeAreaTutor } from 'src/hooks/useKnowledgeAreas'
import { useCreateKnowledgeAreaTutor } from 'src/hooks/useKnowledgeAreas'

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
  chip:{
    margin: theme.spacing(0.5)
  }
}))

const KnowledgeAreaInfoView = (props) => {
  const { area } = props
  const mutation = useUpdateKnowledgeAreaTutor()
  const mutation1 = useCreateKnowledgeAreaTutor()
  const classes = useStyles()
  const { data, isLoading } = useKnowledgeAreas()
  const [id, setId] = useState(0)
  const knowledgeAreas = data
  const [tags, setTags] = useState([])
  const [subKnowledgeAreas, setSubKnowledgeAreas] = useState([])

  useEffect(() => {
    fetchSubKnowledgeAreas(id).then((data) => setSubKnowledgeAreas(data))
  }, [id])

  const formik = useFormik({
    initialValues: formikValues.initialValues,
    validationSchema: formikValues.validation,
    onSubmit: (values, { setSubmitting }) => {
      let jsonValues = formikValues.getValues({
        ...values
      })
      if (area != null) {
        mutation.mutate([jsonValues, area.id])
      } else {
        mutation1.mutate([jsonValues])
      }
    }
  })

  useEffect(() => {
    if (area !== null) {
      formik.setValues({
        tags: area.tags,
        description: area.description,
        knowledge_area: area.knowledge_area.knowledge_area[0],
        speciality: area.knowledge_area.id
      })
      setTags(area.tags.split(','))
      setId(area.knowledge_area.knowledge_area[0])
    } else {
      formik.setValues(formikValues.initialValues)
      setTags([])
      setId(-1)
    }
  }, [area])

  const createTags = (e) => {
    setTags(e.target.value.split(','))
  }

  const deleteTag = (tag) => {
    let str = ''
    tags.forEach((item) => (item !== tag ? (str += item + ',') : <></>))
    setTags(tags.filter((item) => item !== tag))
  }

  return (
    <Paper className={classes.infoView} elevation={3}>
      <Card className={classes.infoView}>
        <Typography
          className={classes.containerTitle}
          variant="h4"
          align="center">
          Información del Área de Conocimiento
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center">
          <Container maxWidth="sm">
            {isLoading ? (
              'Cargando'
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <FormControl
                  variant="outlined"
                  className={classes.selectControl}
                  error={Boolean(formik.errors.knowledge_area)}
                  helpertext={formik.errors.knowledge_area}
                  fullWidth>
                  <InputLabel id="select-area-label">
                    Área de conocimiento
                  </InputLabel>
                  <Select
                    labelId="select-area-label"
                    id="select-area"
                    value={formik.values.knowledge_area}
                    name="knowledge_area"
                    onChange={(e) => {
                      formik.handleChange(e)
                      setId(e.target.value)
                    }}
                    label="Área de conocimiento">
                    <MenuItem value={-1}>
                      <em>---</em>
                    </MenuItem>
                    {knowledgeAreas.map((area, index) => (
                      <MenuItem key={index} value={area.id}>
                        {area.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(formik.errors.knowledge_area) && (
                    <FormHelperText error>
                      {' '}
                      {formik.errors.knowledge_area}{' '}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  variant="outlined"
                  className={classes.selectControl}
                  error={Boolean(
                    formik.touched.speciality && formik.errors.speciality
                  )}
                  helpertext={
                    formik.touched.speciality && formik.errors.speciality
                  }
                  fullWidth>
                  <InputLabel id="select-subarea-label">
                    Especialidad
                  </InputLabel>
                  <Select
                    labelId="select-subarea-label"
                    id="select-subarea"
                    value={formik.values.speciality}
                    name="speciality"
                    onChange={formik.handleChange}
                    label="Especialidad">
                    <MenuItem value={-1}>
                      <em>---</em>
                    </MenuItem>
                    {subKnowledgeAreas.map((subarea, index) => (
                      <MenuItem key={index} value={subarea.id}>
                        {subarea.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(
                    formik.touched.speciality && formik.errors.speciality
                  ) && (
                    <FormHelperText error>
                      {formik.errors.speciality}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box>
                  <TextField
                    id="txt_tags"
                    error={Boolean(formik.touched.tags && formik.errors.tags)}
                    fullWidth
                    helperText={formik.touched.tags && formik.errors.tags}
                    label="Etiquetas, describa palabras clave separadas por coma(,)"
                    margin="normal"
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.handleChange(e)
                      createTags(e)
                    }}
                    name="tags"
                    value={formik.values.tags}
                    variant="outlined"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  {tags.map((tag, index) => (
                    <>
                      {tag !== '' ? (
                        <Chip
                          className={classes.chip}
                          index={index}
                          key={index + 'chip'}
                          label={tag}
                          onDelete={(e) => {
                            deleteTag(tag)
                          }}
                          color="primary"
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </Box>
                <TextField
                  id="txt_description"
                  error={Boolean(
                    formik.touched.description && formik.errors.description
                  )}
                  fullWidth
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  label="Descripción"
                  margin="normal"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="description"
                  value={formik.values.description}
                  variant="outlined"
                />
                {/* <CertificateView /> */}
                <Box my={2} align="center">
                  <Button
                    id="btn_registerArea"
                    type="submit"
                    endIcon={<SaveIcon />}
                    variant="contained"
                    color="primary">
                    {area === null ? 'Guardar area' : 'Actualizar'}
                  </Button>
                </Box>
              </form>
            )}
          </Container>
        </Box>
      </Card>
    </Paper>
  )
}

export default KnowledgeAreaInfoView

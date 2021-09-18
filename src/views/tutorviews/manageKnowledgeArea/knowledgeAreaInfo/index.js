//REACT
import React, { useState } from 'react'

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

import { Formik } from 'formik'

//UTILS
import Validation from './formikValues'

import useKnowledgeAreas from 'src/hooks/useKnowledgeAreas'
//import useSpecialities from 'src/hooks/useSpecialities'

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
  }
}))

let initialValuesObj = {
  id: -1,
  knowledge_area: -1,
  speciality: -1,
  tags: '',
  description: ''
}

const KnowledgeAreaInfoView = (props) => {
  const classes = useStyles()
  const { data, isLoading } = useKnowledgeAreas()
  const knowledgeAreas = data

  const [tags,setTags] = useState([])
  const [txtTags, setTxtTags] = useState(null)

  const handleSelect = (e) => {
   console.log(e.target.value)
  }

  /*const initialTags = (initial) => {
    setTags(initial.split(','))
    setTxtTags(initial)
  }*/

  const createTags = (e) => {
    setTags(e.target.value.split(','))
    setTxtTags(e.target.value)
  }

  const deleteTag = (tag) => {
    let str =''
    tags.forEach( item => (
      item !== tag ? str += item+',' : <></>
    ))
    setTags(tags.filter( item => item!==tag))
    setTxtTags(str)
  }
  return (
    <>
      <Grid item xs={9}>
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
                {isLoading? "Cargando" :(
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
                    else {
                      props.updateSpecialityTutor(
                        jsonValues,
                        props.speciality_tutor.id
                      )
                    }
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
                      <FormControl
                        variant="outlined"
                        className={classes.selectControl}
                        error={Boolean(
                          touched.knowledge_area && errors.knowledge_area
                        )}
                        helpertext={
                          touched.knowledge_area && errors.knowledge_area
                        }
                        fullWidth>
                        <InputLabel id="select-area-label">
                          Área de conocimiento
                        </InputLabel>
                        <Select
                          labelId="select-area-label"
                          id="select-area"
                          value={values.knowledge_area}
                          name="knowledge_area"
                          onChange={(e) => {
                            handleChange(e)
                            handleSelect(e)
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
                        {Boolean(
                          touched.knowledge_area && errors.knowledge_area
                        ) && (
                          <FormHelperText error>
                            {' '}
                            {errors.knowledge_area}{' '}
                          </FormHelperText>
                        )}
                      </FormControl>
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
                          {[].map((subarea, index) => (
                            <MenuItem key={index} value={subarea.id}>
                              {subarea.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {Boolean(touched.speciality && errors.speciality) && (
                          <FormHelperText error>
                            {errors.speciality}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Box>
                        <TextField
                          id="txt_tags"
                          error={Boolean(touched.tags && errors.tags)}
                          fullWidth
                          helperText={touched.tags && errors.tags}
                          label="Etiquetas, describa palabras clave separadas por coma(,)"
                          margin="normal"
                          onBlur={handleBlur}
                          onChange={e => {handleChange(e);createTags(e)} }
                          on
                          name="tags"
                          value={txtTags===null? values.tags : txtTags}
                          variant="outlined"
                          InputProps={{
                            className: classes.input
                          }}
                        />
                        {tags.map((tag,index) => (
                          <>
                            {tag!==''? 
                            <Chip index={index} label={tag} onDelete={e => {
                              deleteTag(tag)
                            }} color="primary" />
                            : <></>}
                          </>
                        ))}
                      </Box>
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
                      <CertificateView />
                      <Box my={2} align="center">
                        <Button
                          id="btn_registerArea"
                          type="submit"
                          endIcon={<SaveIcon />}
                          variant="contained"
                          color='primary'>
                          {props.is_create ? 'Guardar area' : 'Actualizar'}
                        </Button>
                      </Box>
                      <Box my={2}></Box>
                    </form>
                  )}
                </Formik>
                )}
              </Container>
            </Box>
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

export default KnowledgeAreaInfoView

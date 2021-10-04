//REACT
import React, { useEffect } from 'react'

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

import { useFormik } from 'formik'

//UTILS
import formikValues from './formikValues'
import useTutorKnowledgeAreas from 'src/hooks/TutorHooks/useTutorKnowledgeArea'
import useTutorServices from 'src/hooks/TutorHooks/useTutorServices'

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

const ServicesInfoView = (props) => {
  const { service, user } = props
  const classes = useStyles()
  const { data, isLoading } = useTutorKnowledgeAreas(user.id)
  const { useCreateTutorService, useUpdateTutorService } = useTutorServices
  const mutation = useCreateTutorService()
  const mutation1 = useUpdateTutorService()

  const formik = useFormik({
    initialValues: formikValues.initialValues,
    validationSchema: formikValues.validation,
    onSubmit: (values, { setSubmitting }) => {
      let jsonValues = formikValues.getValues({
        ...values
      })
      if (service != null) {
        mutation1.mutate([jsonValues, service.id])
      } else {
        mutation.mutate([jsonValues])
      }
    }
  })

  useEffect(() => {
    console.log(service)
    if (service !== null) {
      formik.setValues({
        title: service.title,
        speciality: service.knowledge_area_tutor,
        description: service.description,
        price: service.price
      })
    } else {
      formik.setValues(formikValues.initialValues)
    }
  }, [service])

  return (
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
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="txt_title"
                error={Boolean(formik.touched.title && formik.errors.title)}
                fullWidth
                helperText={formik.touched.title && formik.errors.title}
                label="Titulo"
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="title"
                value={formik.values.title}
                variant="outlined"
                InputProps={{
                  className: classes.input
                }}
              />
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
                <InputLabel id="select-subarea-label">Especialidad</InputLabel>
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
                  {isLoading
                    ? ''
                    : data.map((subarea, index) => (
                        <MenuItem key={index} value={subarea.id}>
                          {subarea.knowledge_area.name}
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
              <TextField
                id="txt_price"
                error={Boolean(formik.touched.price && formik.errors.price)}
                fullWidth
                helperText={formik.touched.price && formik.errors.price}
                label="Precio $"
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="price"
                value={formik.values.price}
                variant="outlined"
              />
              <Box my={2} align="center">
                <Button
                  id="btn_registerService"
                  className={classes.button}
                  type="submit"
                  endIcon={<SaveIcon />}
                  variant="contained">
                  {service === null ? 'Guardar Servicio' : 'Actualizar'}
                </Button>
              </Box>
              <Box my={2}></Box>
            </form>
          </Container>
        </Box>
      </Card>
    </Paper>
  )
}

export default ServicesInfoView

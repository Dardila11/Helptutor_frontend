import React from 'react'
import {
  Box,
  Button,
  Container,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel
} from '@material-ui/core'
import { Formik } from 'formik'
import CloseIcon from '@material-ui/icons/Close'
import { toast } from 'react-toastify'

import { useCreateOffer } from 'src/hooks/StudentHooks/useStudentOffers'
import {useKnowledgeAreas} from 'src/hooks/useKnowledgeAreas'
import formikValues from './formikUtils/formikValues'

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#005579'
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBlock: theme.spacing(2)
  },
  selectControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}))

const CreatePublicationForm = ({ onClose }) => {
  const classes = useStyles()
  const mutation = useCreateOffer()
  const knowledgeAreasQuery = useKnowledgeAreas()

  let initialValues = {
    title: '',
    description: '',
    knowledge_area: '',
  }
  return (
    <>
      <DialogTitle
        id="publications-dialog-title"
        align="center"
        onClose={onClose}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography component={'span'} variant="h3">
              Agregar publicación
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Container maxWidth="lg">
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={formikValues.validation}
                onSubmit={(values) => {
                  let jsonValues = formikValues.getValues(values) 
                  mutation.mutate(jsonValues, {
                    onSuccess: () => {
                      toast.success("Publicación agregada")
                      onClose()
                    },
                    onError: (err) => {
                      console.log(err)
                      toast.error('Ha ocurrido un error ' + err)
                      onClose()
                    }
                  })
                  
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
                      error={Boolean(touched.knowledge_area && errors.knowledge_area)}
                      helperText={touched.knowledge_area && errors.knowledge_area}
                      fullWidth>
                      <InputLabel id="categories-label">Categoría</InputLabel>
                      <Select
                        labelId="categories-label"
                        id="categories-select"
                        name="knowledge_area"
                        value={values.knowledge_area}
                        onChange={(e) => handleChange(e)}>
                        <MenuItem value={-1}>
                          <em>---</em>
                        </MenuItem>
                        {knowledgeAreasQuery.status === 'success' ? (
                          knowledgeAreasQuery.data.map((area, index) => (
                            <MenuItem
                              key={index}
                              value={area.id}>
                              <em>{area.name}</em>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={0}>
                            <em>---</em>
                          </MenuItem>
                        )}
                      </Select>
                      <FormHelperText id="component-error-text">{
                        touched.knowledge_area &&
                        errors.knowledge_area
                      }</FormHelperText>
                    </FormControl>
                    <TextField
                      id="txt_title"
                      error={Boolean(touched.title && errors.title)}
                      fullWidth
                      helperText={touched.title && errors.title}
                      label="Título"
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
                    <TextField
                      id="txt_description"
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      label="Descripción"
                      margin="normal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="description"
                      value={values.description}
                      variant="outlined"
                      InputProps={{
                        className: classes.input
                      }}
                    />
                    <Button
                      className={classes.submit}
                      id="btn_publish"
                      color="primary"
                      fullWidth
                      type="submit"
                      variant="contained">
                      Agregar
                    </Button>
                  </form>
                )}
              </Formik>
            </Container>
          </Box>
        </DialogContentText>
      </DialogContent>
    </>
  )
}

export default CreatePublicationForm

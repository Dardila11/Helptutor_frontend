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
  MenuItem,
  InputLabel
} from '@material-ui/core'
import { Formik } from 'formik'
import CloseIcon from '@material-ui/icons/Close'

import useStudentKnowledgeAreas from 'src/hooks/StudentHooks/useStudentKnowledgeAreas'
import useCreatePublication from 'src/hooks/useCreatePublication'
import { useAuthState } from 'src/context/context'
import Validation from './formikUtils/formikValues'
import { toast } from 'react-toastify'
import {useKnowledgeAreas} from 'src/hooks/useKnowledgeAreas'

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
  const userId = useAuthState().user.id
  const { data, status } = useStudentKnowledgeAreas(userId)
  const mutation = useCreatePublication()
  const knowledgeAreasQuery = useKnowledgeAreas()

  let initialValues = {
    title: '',
    description: '',
    knowledge_area_student: '',
    student: userId
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
                validationSchema={Validation.validation}
                onSubmit={(values) => {
                  /* let jsonValues = Validation.getValues({
                    ...values
                    //student: student
                  }) */
                  //addPublication(jsonValues)
                  mutation.mutate(values)
                  toast.success("Publicación agregada")
                  onClose()
                  
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
                      fullWidth>
                      <InputLabel id="categories-label">Categoria</InputLabel>
                      <Select
                        labelId="categories-label"
                        id="categories-select"
                        name="knowledge_area_student"
                        value={values.knowledge_area_student}
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
                    </FormControl>
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

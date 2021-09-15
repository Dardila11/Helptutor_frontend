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
  Typography
} from '@material-ui/core'
import { Formik } from 'formik'
import Validation from './formikValues'

import CloseIcon from '@material-ui/icons/Close'

//REDUX
import { addPublication } from 'src/redux/actions/student/student_publications'

import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#005579'
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBlock: theme.spacing(2)
  }
}))

let initialValuesObj = {
  title: '',
  description: ''
}

const PublicationFormView = (props) => {
  const { addPublication, student, publication } = props
  const classes = useStyles()
  let edit = false
  let initialValues = {}
  if (publication === null) initialValues = initialValuesObj
  else {
    initialValues = publication
    edit = true
  }
  return (
    <>
      <DialogTitle
        id="publications-dialog-title"
        align="center"
        onClose={props.onClose}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h3">
              {edit ? 'Editar publicación' : 'Agregar publicación'}
            </Typography>
          </Box>
          <IconButton onClick={props.onClose}>
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
                  let jsonValues = Validation.getValues({
                    ...values,
                    student: student
                  })
                  addPublication(jsonValues)
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
                      {edit ? 'Actualizar' : 'Agregar'}
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

const mapStateToProps = (state) => ({
  student: state.studentInfo.student
})

export default connect(mapStateToProps, {
  addPublication
})(PublicationFormView)

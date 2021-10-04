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
import CloseIcon from '@material-ui/icons/Close'

import { useAuthState } from 'src/context/context'
import Validation from './formikUtils/formikValues'
import { useCreateAdvertisement } from 'src/hooks/useAdvertisements'
import { toast } from 'react-toastify'

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

const CreateAdForm = ({ onClose }) => {
  const classes = useStyles()
  const userId = useAuthState().user.id
  const mutation = useCreateAdvertisement()

  let initialValues = {
    title: '',
    description: '',
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
              Agregar Anuncio
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
                  let jsonValues = Validation.getValues(values)
                  mutation.mutate(jsonValues, {
                    onSuccess: () => {
                      toast.success('Anuncio agregado')
                      onClose()
                    },
                    onError: (err) => {
                      toast.error('Ha ocurrido un error ', + err)
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

export default CreateAdForm

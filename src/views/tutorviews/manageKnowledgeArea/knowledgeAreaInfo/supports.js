//REACT
import React, { useState } from 'react'

//COMPONENTS MATERIAL UI
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import UploadPDF from 'src/components/uploadFile'

//FOMIK
import Validation from './formikValuesSupport'
import { Formik } from 'formik'
//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginLeft: theme.spacing(1),
    marginBlockEnd: theme.spacing(1)
  },
  container: {
    marginLeft: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  gridContainer: {
    marginTop: theme.spacing(1)
  },
  buttonitem: {
    marginLeft: theme.spacing(1)
  },
  actionsContainer: {
    marginTop: theme.spacing(2)
  },
  button: {
    textTransform: 'none'
  }
}))

let initialValues = {
  title: '',
  awarded_by: '',
  year: '',
  file: {
    filename: '',
    type: '',
    size: ''
  }
}

const SupportsView = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    setOpen(false)
  }

  const uploadFile = (e) => {
    setFile(e)
    if (e.length > 0) {
      var name = e[0].name
      var nameSplit = name.split('.')
      var ext = nameSplit[nameSplit.length - 1]
      if (ext === 'pdf') setFile(e[0])
    } else {
      document.getElementById('text-file').textContent = ''
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Paper className={classes.root} elevation={3}>
            <Typography className={classes.title} variant="h5">
              Soportes
            </Typography>
            <Typography className={classes.title}>
              No existen soportes para esta area
            </Typography>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title-support"
              aria-describedby="alert-dialog-description-support">
              <DialogTitle id="alert-dialog-title-support" align="center">
                <Typography variant="h4">SOPORTES</Typography>
              </DialogTitle>
              <DialogContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center">
                  <Container maxWidth="xs">
                    <Formik
                      enableReinitialize={true}
                      initialValues={initialValues}
                      validationSchema={Validation.validation}
                      onSubmit={(values) => {
                        let jsonValues = Validation.getValues(values)
                        if (props.is_create) {
                          console.log('post support:')
                          console.log(jsonValues)
                        } else console.log('put support')
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
                          />
                          <TextField
                            id="txt_awarded_by"
                            error={Boolean(
                              touched.awarded_by && errors.awarded_by
                            )}
                            fullWidth
                            helperText={touched.awarded_by && errors.awarded_by}
                            label="Otorgado por (Ej: Universidad, Platzi, Udemy...)"
                            margin="normal"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="awarded_by"
                            value={values.awarded_by}
                            variant="outlined"
                          />
                          <TextField
                            id="year"
                            error={Boolean(touched.year && errors.year)}
                            helperText={touched.year && errors.year}
                            label="Año"
                            margin="normal"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="year"
                            value={values.year}
                            variant="outlined"
                          />
                          <Grid className={classes.gridContainer}>
                            <Typography>Certificado:</Typography>
                            <UploadPDF uploadFile={uploadFile} file={file} />
                            {/*<input
                                  className={classes.input}
                                  accept="application/pdf"
                                  id="contained-button-file"
                                  multiple
                                  type="file"
                                  onChange= {handleFile}
                                />
                                <label htmlFor="contained-button-file">                                
                                    <Button variant="contained" color="primary" component="span" endIcon={<PublishIcon/>}>
                                      Subir file
                                    </Button>
                                </label>*/}
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            className={classes.actionsContainer}>
                            <Grid item sm={6} align="center">
                              <Button
                                id="btn_Cancelar"
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                                variant="outlined"
                                onClick={handleClose}>
                                Cancelar
                              </Button>
                            </Grid>
                            <Grid item sm={6} align="center">
                              <Button
                                id="btn_addSupport"
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleSave}>
                                Guardar
                              </Button>
                            </Grid>
                          </Grid>
                          <Box my={2}></Box>
                          <Box my={2}></Box>
                        </form>
                      )}
                    </Formik>
                  </Container>
                </Box>
              </DialogContent>
            </Dialog>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            component="span"
            onClick={handleOpen}
            endIcon={<AddCircleIcon />}>
            Agregar Soporte
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SupportsView

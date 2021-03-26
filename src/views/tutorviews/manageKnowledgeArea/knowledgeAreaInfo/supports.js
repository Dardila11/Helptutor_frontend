//REACT
import React, { useState } from 'react'

//COMPONENTS MATERIAL UI
import { Box, Button, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import AddCircleIcon from '@material-ui/icons/AddCircle';

//FOMIK
import Validation from './formikValuesSupport'
import { Formik } from 'formik'
//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {},
  title:{
    marginTop: theme.spacing(1)
  },
  container: {
    marginLeft: theme.spacing(2)
  },
  input:{
    display: 'none'
  },
  gridContainer: {
    marginTop: theme.spacing(1)
  },
  buttonitem: {
    marginLeft: theme.spacing(1)
  },
  actionsContainer:{
    marginTop: theme.spacing(2)
  }
}))

let initialValues= {
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

  const handleOpen = () =>{
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }
  
  const handleSave = () =>{
    setOpen(false)
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography className={classes.title} variant="h4" align='center'>Soportes</Typography>
      <Grid className={classes.container} container spacing={2}>
        <Grid item xs={6}>
          <Typography>No existen soportes para esta area</Typography>
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" color="primary" component="span" onClick={handleOpen} endIcon={<AddCircleIcon/>}>
          Agregar Soporte
        </Button>
        <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title-support"
              aria-describedby="alert-dialog-description-support"
            >
              <DialogTitle id="alert-dialog-title-support">{"SOPORTES"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description-support">
                  Agregar nuevo soporte
                </DialogContentText>
                  <Box
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center">
                    <Container maxWidth="sm">
                      <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={Validation.validation}
                        onSubmit={(values) => {
                          let jsonValues = Validation.getValues(values)
                          if (props.is_create) console.log('post support'+jsonValues)
                          else console.log('put support')
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
                              error={Boolean(touched.awarded_by && errors.awarded_by)}
                              fullWidth
                              helperText={touched.awarded_by && errors.awarded_by}
                              label="Otorgado por (Ej: Universidad del Cauca, Platzi, Udemy...)"
                              margin="normal"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="awarded_by"
                              value={values.awarded_by}
                              variant="outlined"
                            />
                            <TextField
                              id="year"
                              error={Boolean(
                                touched.year && errors.year
                              )}
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
                              <Typography>
                                Certificado: 
                              </Typography>
                              <input
                                className={classes.input}
                                accept="application/pdf"
                                id="contained-button-file"
                                multiple
                                type="file"
                              />
                              <label htmlFor="contained-button-file">                                
                                  <Button variant="contained" color="primary" component="span" fullWidth endIcon={<PublishIcon/>}>
                                    Subir archivo
                                  </Button>
                              </label>
                            </Grid>
                            <Grid container spacing={2} className={classes.actionsContainer}>
                                <Grid item sm={6}>
                                  <Button
                                      id="btn_Cancelar"
                                      color="primary"
                                      fullWidth
                                      size="large"
                                      type="submit"
                                      variant="outlined"
                                      onClick={handleClose}>
                                      Cancelar
                                  </Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button
                                      id="btn_addSupport"
                                      color="primary"
                                      fullWidth
                                      size="large"
                                      type="submit"
                                      variant="contained"
                                      onClick={handleSave}>
                                      Guardar Soporte
                                  </Button>
                                </Grid>
                            </Grid>
                            <Box my={2}>
                              
                            </Box>
                            <Box my={2}></Box>
                          </form>
                        )}
                      </Formik>
                    </Container>
                  </Box>
              </DialogContent>
            </Dialog>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SupportsView

//REACT
import React, { useState } from 'react'

//COMPONENTS MATERIAL UI
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PublishIcon from '@material-ui/icons/Publish'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

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
    textTransform: 'none',    
  },
  supportItem: {
    padding: '0px'
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
  const { files, setFiles } = props
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [file, setFile] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const handleClose = () => {
    setOpen(false)
    setFile(null)
  }

  const fileSelectedHandler = (e) => {
    setFile(e.target.files[0])
  }

  const handleInput = () => {
    const element = document.getElementById('fileInput')
    element.click()
  }

  const handleEdit = () => {
    setOpen(true)
  }

  return (
    <>
          <Paper className={classes.root} elevation={3}>
          <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
            <Box>
              <Box textAlign='center'>
                <Typography variant="h4">
                  Soportes
                </Typography>
              </Box>                
              {files.length > 0 ? (
                 <List aria-label="main mailbox folders">                   
                    {files.map((file) => (
                      <ListItem key={file.title} className={classes.supportItem}>
                        <PictureAsPdfIcon />
                        <ListItemText primary={file.title} />
                        <IconButton aria-label="editar soporte" component="span" onClick={handleEdit}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="editar soporte" component="span" onClick={handleOpenDelete}>
                          <DeleteIcon />
                        </IconButton>
                        <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title-delete"
                        aria-describedby="alert-dialog-description-delete">
                        <DialogTitle id="alert-dialog-title-delete" align="center">
                          <Typography variant="h4">Eliminar soporte</Typography>
                        </DialogTitle>
                        <DialogContent>
                          <Typography>
                            Estas seguro de querer eliminar el soporte de {file.title}?
                          </Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button variant='contained' onClick={handleCloseDelete}>
                            Cancelar
                          </Button>
                          <Button variant='contained' color='primary'>
                            Eliminar
                          </Button>
                        </DialogActions>
                        </Dialog>
                      </ListItem>
                      ))}
                 </List>
              ):(
                <Typography>
                  No has cargado soportes para esta area
                </Typography>
                )}
            </Box>
            
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
                        jsonValues = {...jsonValues,
                                      file: file}
                        setFiles(files.concat(jsonValues))
                        setOpen(false)
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
                              <Box>
                                <input style={{display: 'none'}} id='fileInput' accept="application/pdf" type='file' onChange={fileSelectedHandler} className={classes.input}/>
                                <Button
                                  variant='contained'
                                  color='primary'
                                  onClick={handleInput}
                                  endIcon={<PublishIcon />}>
                                    Subir certificado
                                </Button>
                              </Box>
                              <Box>
                                <Typography>
                                  {file===null ? 'Aun no has seleccionado el archivo': file.name}
                                </Typography>
                              </Box>
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
                                variant="contained">
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
                <Box className={classes.button}>
                  <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={handleOpen}
                  endIcon={<AddCircleIcon />}>
                  Agregar Soporte
                </Button>
              </Box>
            </Box>
          </Paper>
    </>
  )
}

export default SupportsView

import React, { useState } from 'react'

//material-ui
import {
    Box,
    Button,
    Container,
    DialogContent,
    Grid,
    makeStyles,
    TextField,
    Typography
  } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'

//redux
import { connect } from 'react-redux'
import { AddCertificate, UpdateCertificate } from 'src/redux/actions/tutor/certificates'

//formik
import Validation from './formikValuesCertificate'
import { Formik } from 'formik'
import { isUndefined } from 'lodash-es'

//styles
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
      marginBottom: theme.spacing(1)    
    }
  }))

const initialValues = {
    title: '',
    awarded_by: '',
    year: '',
    file: {
        filename: '',
        type: '',
        size: ''
    }
}

const CertificateDialog = (props) => {

    const classes = useStyles()
    const { add, close, AddCertificate, UpdateCertificate, certificate } = props
    const [file, setFile] = useState(null)

    const handleClose = () => {
        setFile(null)
        close()
    }

    const fileSelectedHandler = (e) => {
        setFile(e.target.files[0])
    }

    const handleInput = () => {
        const element = document.getElementById('fileInput')
        element.click()
    }

    return(
              <DialogContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center">
                  <Container maxWidth="xs">
                    <Formik
                      enableReinitialize={true}
                      initialValues={isUndefined(certificate)? initialValues:certificate}
                      validationSchema={Validation.validation}
                      onSubmit={(values) => {
                        let jsonValues = Validation.getValues(values)
                        console.log("submit certificates")
                        console.log(jsonValues)
                        if(add) {
                            jsonValues = {...jsonValues, file: file}
                            AddCertificate(jsonValues)
                        }
                        else {
                            jsonValues = {...jsonValues, file: certificate.file}
                            UpdateCertificate(jsonValues)
                        }
                        close()
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
                                  {isUndefined(certificate)? 
                                  <>{file===null ? 'Aun no has seleccionado el archivo': file.name}</>: certificate.file.name}
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
                                id="btn_addCertificate"
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained">
                                    {add? 'Guardar':'Actualizar'}
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    </Formik>
                  </Container>
                </Box>
              </DialogContent>
    )
}

const mapStateToProps = (state) => ({
  })
  
export default connect(mapStateToProps, {
    AddCertificate, UpdateCertificate
  })(CertificateDialog)

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import Validation from './formikValues'
import { connect } from 'react-redux';
import { addNomination, updateNomination, deleteNomination } from 'src/redux/actions/tutor/nominations'
import { isUndefined } from 'lodash-es';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(1),
    color: theme.palette.common.white
  },
  delete: {
    margin:theme.spacing(1),
    backgroundColor: '#ef5350',
    color: theme.palette.common.white
  }
}));

let initialValuesObj= {
  title: '',
  description: ''
}

const NominationView = (props) => {
    const classes = useStyles()
    const {nomination,publication, tutor, addNomination, closeDialog, updateNomination, deleteNomination} = props
    let opNomination = isUndefined(nomination)    
    const [open, setOpen] = React.useState(false)

    const handleDelete = () => {
      setOpen(false)
      closeDialog()
      deleteNomination(nomination.id)
    }

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }
    return (
        
                    <>
                        <DialogTitle id='publications-dialog-title' align='center'>
                            <Typography> <b>{publication.title.toUpperCase()}</b></Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Box
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'>
                                  <Typography variant="subtitle1" color="textSecondary">
                                    Publicación de: <b>UserName</b>
                                  </Typography>
                                  <Typography variant="subtitle1" color="textSecondary">
                                    {publication.description}
                                  </Typography>
                                <Container maxWidth='lg'>
                                    <Formik
                                        enableReinitialize = {true}
                                        initialValues={opNomination? (initialValuesObj):(nomination)}
                                        validationSchema={Validation.validation}
                                        onSubmit={(values) => {
                                            let jsonValues = Validation.getValues({
                                                ...values,
                                                offer: publication.id,
                                                tutor: tutor
                                            })
                                            if(opNomination) addNomination(jsonValues)
                                            else updateNomination(nomination.id,jsonValues)
                                            closeDialog()
                                        }}>
                                        {({
                                            errors,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                            touched,
                                            values
                                        })=> (
                                            <form onSubmit={handleSubmit}>
                                                <TextField
                                                id='txt_price_nomination'
                                                error={Boolean(touched.price && errors.price)}
                                                fullWidth
                                                helperText={touched.price && errors.price}
                                                label='Precio $'
                                                margin='normal'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="price"
                                                value={values.price}
                                                variant='outlined'
                                                placeholder='Cuanto deseas cobrar por tu servicio'
                                                InputProps={{
                                                    className: classes.input
                                                }}/>
                                            <TextField
                                            id='txt_description_nomination'
                                            error={Boolean(touched.description && errors.description)}
                                            fullWidth
                                            helperText={touched.description && errors.description}
                                            label='Descripción de la postulación'
                                            margin='normal'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name='description'
                                            multiline
                                            rows={3}
                                            value={values.description}
                                            variant='outlined'
                                            placeholder='Describe de que forma podrias ayudarlo a resolver su problema'
                                            InputProps={{
                                                className: classes.input
                                            }}/>
                                            <Box display='flex' flexDirection='row'>
                                              <Button
                                              className={classes.submit}
                                              id='btn_nominate'
                                              color='primary'
                                              fullWidth
                                              type='submit'
                                              variant='contained'>
                                                  {opNomination ? ('Postularme'):('Actualizar')}
                                              </Button>
                                              {opNomination ? (<></>):(
                                                <>
                                                <Button
                                                className={classes.delete}
                                                id='btn_cancel_nominate'
                                                color='primary'
                                                fullWidth
                                                onClick={handleOpen}                                                
                                                variant='contained'>
                                                    Eliminar
                                                </Button>
                                                </>
                                              )}
                                              <Button
                                                className={classes.submit}
                                                id='btn_cancel_nominate'
                                                fullWidth
                                                color='secondary'
                                                onClick={closeDialog}
                                                variant='contained'>
                                                    Cancelar
                                                </Button>
                                            </Box>                                            
                                        </form>
                                        )}

                                    </Formik>
                                </Container>
                            </Box>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">{"Advertencia"}</DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  ¿Estas seguro de eliminar esta postulacion?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                  Cancelar
                                </Button>
                                <Button onClick={handleDelete} 
                                  color="primary" 
                                  variant='contained'
                                  autoFocus>
                                  Eliminar
                                </Button>
                              </DialogActions>
                            </Dialog>
                        </DialogContent>
                    </>  
  );
}

const mapStateToProps = (state) => ({
  tutor: state.tutorInfo.tutor
})

export default connect(mapStateToProps, {
  addNomination,
  updateNomination,
  deleteNomination
})(NominationView)
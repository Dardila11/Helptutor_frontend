import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import Validation from './formikValues'
import { connect } from 'react-redux';
import { addNomination } from 'src/redux/actions/tutor/nominations'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

let initialValuesObj= {
  title: '',
  description: ''
}

const NominationView = (props) => {
    const classes = useStyles()
    const {publication, tutor, addNomination, closeDialog} = props
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
                                        initialValues={initialValuesObj}
                                        validationSchema={Validation.validation}
                                        onSubmit={(values) => {
                                            let jsonValues = Validation.getValues({
                                                ...values,
                                                offer: publication.id,
                                                tutor: tutor
                                            })
                                            console.log(jsonValues)
                                            addNomination(jsonValues)
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
                                            <Button
                                            className={classes.submit}
                                            id='btn_nominate'
                                            color='primary'
                                            fullWidth
                                            type='submit'
                                            variant='contained'>
                                                Postularme
                                            </Button>
                                        </form>
                                        )}

                                    </Formik>
                                </Container>

                            </Box>
                        </DialogContent>
                    </>  
  );
}

const mapStateToProps = (state) => ({
  tutor: state.tutorInfo.tutor
})

export default connect(mapStateToProps, {
  addNomination
})(NominationView)
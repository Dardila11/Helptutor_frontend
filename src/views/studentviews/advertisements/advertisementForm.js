import React from 'react'
import { Box, Button, Container, DialogContent, DialogTitle, makeStyles, TextField, Typography } from '@material-ui/core'
import { Formik } from 'formik';
import Validation from './formikValues'

//REDUX

import { connect } from 'react-redux'
import { addAdvertisement } from 'src/redux/actions/advertisements';

const useStyles = makeStyles((theme) => ({

    input: {
        color: '#005579'
    },
    submit: {
        marginTop: theme.spacing(2),
        marginBlock: theme.spacing(2)
    }
}))

let initialValuesObj= {
    title: '',
    description: ''
}

const AdvertisementFormView = (props) => {
    const {addAdvertisement, student} = props
    const classes = useStyles()
    return (
        
                    <>
                        <DialogTitle id='publications-dialog-title' align='center'>
                            <Typography> NUEVO ANUNCIO</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Box
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'>
                                <Container maxWidth='lg'>
                                    <Formik
                                        enableReinitialize = {true}
                                        initialValues={initialValuesObj}
                                        validationSchema={Validation.validation}
                                        onSubmit={(values) => {
                                            let jsonValues = Validation.getValues({
                                                ...values,
                                                student: student
                                            })
                                            addAdvertisement(jsonValues)
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
                                                id='txt_title_advertisement'
                                                error={Boolean(touched.title && errors.title)}
                                                fullWidth
                                                helperText={touched.title && errors.title}
                                                label='Titulo del anuncio'
                                                margin='normal'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name='title'
                                                value={values.title}
                                                variant='outlined'
                                                InputProps={{
                                                    className: classes.input
                                                }}/>
                                            <TextField
                                            id='txt_description_advertisement'
                                            error={Boolean(touched.description && errors.description)}
                                            fullWidth
                                            helperText={touched.description && errors.description}
                                            label='Descripción del anuncio'
                                            margin='normal'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name='description'
                                            value={values.description}
                                            variant='outlined'
                                            InputProps={{
                                                className: classes.input
                                            }}/>
                                            <Button
                                            className={classes.submit}
                                            id='btn_publish_advertisement'
                                            color='primary'
                                            fullWidth
                                            type='submit'
                                            variant='contained'>
                                                Publicar
                                            </Button>
                                        </form>
                                        )}

                                    </Formik>
                                </Container>

                            </Box>
                        </DialogContent>
                    </>                
    )
}

const mapStateToProps = (state) => ({
    student: state.studentInfo.student
  })
  
  export default connect(mapStateToProps, {
    addAdvertisement
  })(AdvertisementFormView)
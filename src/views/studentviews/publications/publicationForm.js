import React, { useState } from 'react'
import { Box, Button, Container, DialogContent, DialogTitle, makeStyles, TextField, Typography } from '@material-ui/core'
import { Formik } from 'formik';
import Validation from './formikValues'

//REDUX
import { addPublication } from 'src/redux/actions/publications'

import { connect } from 'react-redux'
import { isUndefined } from 'lodash-es';

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

const PublicationFormView = (props) => {
    const {addPublication, student, publication} = props
    const [initialValues, setInitialValues] = useState(initialValuesObj)
    const classes = useStyles()
    const [edit, setEdit] = React.useState(false)
    //if(isUndefined(publication)) setEdit(true)
    return (
                    <>
                        <DialogTitle id='publications-dialog-title' align='center'>
                            <Typography> {true? ('Editar publicación'):('Agregar publicación')}</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Box
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'>
                                <Container maxWidth='lg'>
                                    <Formik
                                        enableReinitialize = {true}
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
                                        })=> (
                                            <form onSubmit={handleSubmit}>
                                                <TextField
                                                id='txt_title'
                                                error={Boolean(touched.title && errors.title)}
                                                fullWidth
                                                helperText={touched.title && errors.title}
                                                label='Titulo'
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
                                            id='txt_description'
                                            error={Boolean(touched.description && errors.description)}
                                            fullWidth
                                            helperText={touched.description && errors.description}
                                            label='Descripción'
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
                                            id='btn_publish'
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
    addPublication
  })(PublicationFormView)
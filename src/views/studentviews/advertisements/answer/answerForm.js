import React from 'react'
import { Avatar, Box, Button, Container, DialogContent, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { Formik } from 'formik';
import Validation from './formikValues'
import SendIcon from '@material-ui/icons/Send';

//REDUX

import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({

    input: {
        color: '#005579'
    },
    submit: {
        marginTop: theme.spacing(2),
        marginBlock: theme.spacing(2)
    },
    cover: {        
        width: 80,
        height: 80
    }
}))

let initialValuesObj= {
    title: '',
    description: ''
}

const AnswerFormView = (props) => {
    const { student, advertisement} = props
    const classes = useStyles()
    return (
        
                    <>
                        <DialogTitle id='publications-dialog-title' align='center'>
                            <Typography> ANUNCIO</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container>
                                        <Grid item xs={2}>
                                            <Avatar className={classes.cover} alt='user photo' src='/static/images/avatars/avatar_6.png'/>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography>
                                                <b>{advertisement.title}</b>
                                            </Typography>
                                            <Typography>
                                                {advertisement.description}
                                            </Typography>
                                        </Grid>                 
                                <Box
                                    justifyContent='center'>
                                    <Container>
                                        <Formik
                                            enableReinitialize = {true}
                                            initialValues={initialValuesObj}
                                            validationSchema={Validation.validation}
                                            onSubmit={(values) => {
                                                let jsonValues = Validation.getValues({
                                                    ...values,
                                                    advertisement: advertisement.id,
                                                    student: student
                                                })
                                                console.log(jsonValues)
                                                //addPublication(jsonValues)
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
                                                    <Grid container>
                                                        <Grid item xs={11}>
                                                            <TextField
                                                            id='txt_description'
                                                            error={Boolean(touched.description && errors.description)}
                                                            fullWidth
                                                            helperText={touched.description && errors.description}
                                                            label='Comentar'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            name='description'
                                                            value={values.description}
                                                            InputProps={{
                                                                className: classes.input
                                                            }}/>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Button
                                                            className={classes.submit}
                                                            id='btn_publish'
                                                            color='primary'
                                                            type='submit'
                                                            variant='contained'
                                                            >
                                                                <SendIcon fontSize='small'/>
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                            </form>
                                            )}

                                        </Formik>
                                    </Container>

                                </Box>
                            </Grid>
                        </DialogContent>
                    </>                
    )
}

const mapStateToProps = (state) => ({
    student: state.studentInfo.student
  })
  
  export default connect(mapStateToProps, {
  })(AnswerFormView)
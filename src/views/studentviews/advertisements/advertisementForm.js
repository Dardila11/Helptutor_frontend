import React from 'react'
import {
  Box,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  Paper,
  Container
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { Formik } from 'formik'
import Validation from './formikValues'

//REDUX

import { connect } from 'react-redux'
import { addAdvertisement } from 'src/redux/actions/student/advertisements'

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#005579'
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBlock: theme.spacing(2)
  },
  paper: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    borderRadius: '20px',
    padding: theme.spacing(1)
  },
  formContainer: {
    display : 'flex',
    flexDirection :'row',
    alignItems: 'center'
  }
}))

let initialValuesObj = {
  title: '',
  description: ''
}

const AdvertisementFormView = (props) => {
  const { addAdvertisement, student } = props
  const classes = useStyles()
  return (
    <>
        <Paper className={classes.paper} elevation={3}> 
              <Formik
                enableReinitialize={true}
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
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box className={classes.formContainer}>
                      <Container >
                        <Typography  gutterBottom>
                        <b>Publica un anuncio</b>
                      </Typography>
                        <TextField
                          id="txt_title_advertisement"
                          error={Boolean(touched.title && errors.title)}
                          fullWidth
                          helperText={touched.title && errors.title}
                          placeholder="Titulo"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          size="small"
                          variant="outlined"
                          name="title"
                          value={values.title}
                          InputProps={{
                            className: classes.input
                          }}
                        />
                        <TextField
                          id="txt_description_advertisement"
                          error={Boolean(touched.description && errors.description)}
                          fullWidth
                          helperText={touched.description && errors.description}
                          placeholder="Descripción"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="description"
                          value={values.description}
                          multiline
                          rows={2}
                          variant="outlined"
                          InputProps={{
                            className: classes.input
                          }}
                        />
                      </Container>
                        <Box>
                          <IconButton
                          className={classes.submit}
                          color="primary"
                          type="submit"
                          fontSize="large"
                          variant="outlined">
                            <SendIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </Paper>
    </>
  )
}

const mapStateToProps = (state) => ({
  student: state.studentInfo.student
})

export default connect(mapStateToProps, {
  addAdvertisement
})(AdvertisementFormView)

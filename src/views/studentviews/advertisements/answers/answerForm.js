import React from 'react'
import { Box, Grid, IconButton, makeStyles, TextField } from '@material-ui/core'
import { Formik } from 'formik'
import Validation from './formikValues'
import SendIcon from '@material-ui/icons/Send'

//REDUX
import { addAnswer } from 'src/redux/actions/student/advertisements'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#005579'
  },
  submit: {
    marginTop: theme.spacing(2)
  }
}))

let initialValuesObj = {
  description: ''
}

const AnswerFormView = (props) => {
  const { user, advertisement, addAnswer } = props
  const classes = useStyles()
  return (
    <Box justifyContent="center">
      <Formik
        enableReinitialize={true}
        initialValues={initialValuesObj}
        validationSchema={Validation.validation}
        onSubmit={(values, { resetForm }) => {
          let jsonValues = Validation.getValues({
            ...values,
            advertisement: advertisement.id,
            user: user
          })
          console.log(jsonValues)
          addAnswer(jsonValues)
          resetForm({ values: initialValuesObj })
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
            <Grid container>
              <Grid item xs={11}>
                <TextField
                  id="txt_description"
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Comentar"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="description"
                  value={values.description}
                  InputProps={{
                    className: classes.input
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  className={classes.submit}
                  id="btn_publish"
                  color="primary"
                  type="submit">
                  <SendIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user.id
})

export default connect(mapStateToProps, {
  addAnswer
})(AnswerFormView)

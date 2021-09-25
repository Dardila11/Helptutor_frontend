import {
    Box,
    Button,
    Container,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    makeStyles,
    TextField,
    Typography
  } from '@material-ui/core'
  import { Formik } from 'formik'
  import CloseIcon from '@material-ui/icons/Close'
  
  import { useUpdateAdvertisement } from 'src/hooks/useAdvertisements'
  import Validation from './formikUtils/formikValues'
  
  const useStyles = makeStyles((theme) => ({
    input: {
      color: '#005579'
    },
    submit: {
      marginTop: theme.spacing(2),
      marginBlock: theme.spacing(2)
    },
    selectControl: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    }
  }))
  
  const UpdateAdFormView = ({ onClose, advertisement }) => {
    const classes = useStyles()
    const mutationUpdate = useUpdateAdvertisement()
    let initialValues = {
        title: advertisement.title,
        description: advertisement.description,
    }
    return (
      <>
        <DialogTitle
          id="publications-dialog-title"
          align="center"
          onClose={onClose}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography component={'span'} variant="h3">
                Editar Anuncio
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Container maxWidth="lg">
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  validationSchema={Validation.validation}
                  onSubmit={(values) => {
                    /* let jsonValues = Validation.getValues({
                      ...values
                      //student: student
                    }) */
                    mutationUpdate.mutate([advertisement.id, values]) 
                    onClose()
                    
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
                        InputProps={{
                          className: classes.input
                        }}
                      />
                      <TextField
                        id="txt_description"
                        error={Boolean(touched.description && errors.description)}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label="Descripción"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="description"
                        value={values.description}
                        variant="outlined"
                        InputProps={{
                          className: classes.input
                        }}
                      />
                      <Button
                        className={classes.submit}
                        id="btn_publish"
                        color="primary"
                        fullWidth
                        type="submit"
                        variant="contained">
                        Actualizar
                      </Button>
                    </form>
                  )}
                </Formik>
              </Container>
            </Box>
          </DialogContentText>
        </DialogContent>
      </>
    )
  }
  
  export default UpdateAdFormView
  
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core'
import useNomination from 'src/hooks/TutorHooks/useNomination'
import { toast } from 'react-toastify'

import { isNil, toArray } from 'lodash-es'
import { Formik } from 'formik'

import Validation from './formikValues'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  submit: {
    margin: theme.spacing(1),
    color: theme.palette.common.white
  },
  delete: {
    margin: theme.spacing(1),
    backgroundColor: '#ef5350',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#cc2e2b'
    }
  }
}))

let initialValuesObj = {
  title: '',
  description: ''
}

const NominationView = (props) => {
  const classes = useStyles()
  const { nomination, publication, closeDialog, user } = props
  const {
    useCreateNomination,
    useUpdateNomination,
    useDeleteNomination
  } = useNomination
  const mutation = useCreateNomination()
  const mutation1 = useUpdateNomination()
  const mutation2 = useDeleteNomination()
  let opNomination = isNil(nomination)
  const [open, setOpen] = React.useState(false)

  const handleDelete = () => {
    mutation2.mutate(nomination.id)
    closeDialog()
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <DialogTitle id="publications-dialog-title" align="center">
        <Typography>
          <b>{publication.title}</b>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="subtitle1" color="textSecondary">
            Publicación de:{' '}
            <b>
              {user.first_name} {user.last_name}
            </b>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {publication.description}
          </Typography>
          <Formik
            enableReinitialize
            initialValues={opNomination ? initialValuesObj : nomination}
            validationSchema={Validation.validation}
            onSubmit={(values) => {
              let jsonValues = Validation.getValues({
                ...values,
                offer: publication.id
              })
              if (opNomination) mutation.mutate(jsonValues)
              else mutation1.mutate([nomination.id, jsonValues])
              closeDialog()
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
                  id="txt_price_nomination"
                  error={Boolean(touched.price && errors.price)}
                  fullWidth
                  helperText={touched.price && errors.price}
                  label="Precio $"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="price"
                  value={values.price}
                  variant="outlined"
                  placeholder="Cuanto deseas cobrar por tu servicio"
                />
                <TextField
                  id="txt_description_nomination"
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Descripción de la postulación"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="description"
                  multiline
                  rows={3}
                  value={values.description}
                  variant="outlined"
                  placeholder="Describe de que forma podrias ayudarlo a resolver su problema"
                />
                <Box display="flex" flexDirection="row">
                  <Button
                    className={classes.submit}
                    id="btn_nominate"
                    color="primary"
                    fullWidth
                    type="submit"
                    variant="contained">
                    {opNomination ? 'Postularme' : 'Actualizar'}
                  </Button>
                  {opNomination ? null : (
                    <Button
                      className={classes.delete}
                      id="btn_cancel_nominate"
                      color="primary"
                      fullWidth
                      onClick={handleOpen}
                      variant="contained">
                      Eliminar
                    </Button>
                  )}
                  <Button
                    className={classes.submit}
                    id="btn_cancel_nominate"
                    fullWidth
                    color="secondary"
                    onClick={closeDialog}
                    variant="contained">
                    Cancelar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{'Advertencia'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Estas seguro de eliminar esta postulacion?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              className={classes.delete}
              onClick={handleDelete}
              variant="contained"
              autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
    </>
  )
}

export default NominationView

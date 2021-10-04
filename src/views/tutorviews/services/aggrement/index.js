import React, { useState } from 'react'

// FORM
import { Formik } from 'formik'
import Validation from './formikValues'

// STYLES
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Typography,
  Checkbox
} from '@material-ui/core'
import useAggrement from 'src/hooks/TutorHooks/useAggrement'

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

function AggrementView(props) {
  const classes = useStyles()
  const { aggrement, closeDialog } = props
  const { useUpdateAggrement } = useAggrement
  const mutation = useUpdateAggrement()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <DialogTitle id="publications-dialog-title" align="center">
        <Typography>
          <b>{aggrement.service.title}</b>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="subtitle1" color="textSecondary">
            Solicitado por:{' '}
            <b>
              {aggrement.student.user.first_name}{' '}
              {aggrement.student.user.last_name}
            </b>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {aggrement.service.description}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {aggrement.is_accepted_student
              ? 'El estudiante acepto'
              : 'El estudiante no acepta aún'}
          </Typography>
          <Formik
            initialValues={aggrement}
            validationSchema={Validation.validation}
            onSubmit={(values) => {
              let jsonValues = Validation.getValues({
                ...values
              })
              console.log('on_submit', jsonValues)
              mutation.mutate([aggrement.id, jsonValues])
              closeDialog()
            }}>
            {({ handleChange, handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_accepted_tutor"
                      checked={values.is_accepted_tutor}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="¿Acepta la cotraoferta?"
                />
                <Box display="flex" flexDirection="row">
                  <Button
                    className={classes.submit}
                    id="btn_nominate"
                    color="primary"
                    fullWidth
                    type="submit"
                    variant="contained">
                    Actualizar
                  </Button>
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
      </DialogContent>
    </div>
  )
}

export default AggrementView

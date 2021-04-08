import React, { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core';
import { connect } from 'react-redux'

const initialValues = {
  msg: '',
  status: ''
}

const AlertComponent = (props) => {
  const { alert } = props
  const position = {vertical: 'top', horizontal: 'center'}
  const [open, setOpen] = useState(false)
  const [state, setState] = useState(initialValues);

    useEffect(() => {
      if (alert.msg !== '') {
        setState(alert)
        setOpen(true)
      }
    }, [alert])
  

    const handleClose = () => {
      setOpen(false);
    };

  return (
      <Snackbar 
        anchorOrigin={position} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert elevation={6} variant='filled' severity={state.status} onClose={handleClose}>
          {state.msg}
        </Alert>
      </Snackbar>
    )
}

const mapStateToProps = (state) => ({
    alert : state.alert
  })

export default connect(mapStateToProps, {
  })(AlertComponent)
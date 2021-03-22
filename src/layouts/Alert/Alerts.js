import React, { Component, Fragment, useEffect } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alerts = (props) => {
  // static propTypes = {
  //   error: PropTypes.object.isRequired,
  //   message: PropTypes.object.isRequired,
  // };
  const { error, alert, message } = props

  useEffect(() => {
    if (error) {
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join())
    }
    if (message.setMessage) alert.success(message.setMessage)
  }, [error, alert, message])

  return <Fragment />
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts))

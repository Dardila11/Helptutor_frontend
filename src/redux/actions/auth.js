import Api from '../../services/Api'
import { createMessage, returnErrors } from './messages'

import {
  ADD_TUTOR,
  UPDATE_TUTOR,
  GET_TUTOR
  /* 
  DELETE_TUTOR,
  LIST_TUTOR */
} from './types_auth'

export const updateTutor = (id, data) => (dispatch) => {
  const request = Api.updateTutorInfo(id, data)
  request
    .then((res) => {
      dispatch({
        type: UPDATE_TUTOR,
        payload: res.data
      })
      dispatch(
        createMessage({ setMessage: 'Información del tutor actualizada' })
      )
    })
    .catch((err) => {
      dispatch(
        returnErrors({
          non_field_errors: [err.response.data.detail],
          status: 400
        })
      )
    })
}

export const getTutorInfo = (id) => (dispatch) => {
  Api.getTutorInfo(id)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: GET_TUTOR,
          payload: res.data
        })
        dispatch(createMessage({ setMessage: 'Information retrieved' }))
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors({
          non_field_errors: [err.response.data.detail],
          status: 400
        })
      )
    })
}

export const addUser = (data) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.postTutor(data)
  request
    .then((res) => {
      dispatch({
        type: ADD_TUTOR,
        payload: res.data
      })
      dispatch(createMessage({ setMessage: 'Tutor registrado' }))
    })
    .catch((err) => {
      dispatch(
        returnErrors({
          non_field_errors: [err.response.data.detail],
          status: 400
        })
      )
    })
}

export const addUserGoogle = (data) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.postGoogleTutor(data)
  request
    .then((res) => {
      dispatch({
        type: ADD_TUTOR,
        payload: res.data
      })
      dispatch(createMessage({ setMessage: 'Tutor registrado' }))
    })
    .catch((err) => {
      dispatch(
        returnErrors({
          non_field_errors: [err.response.data.detail],
          status: 400
        })
      )
    })
}
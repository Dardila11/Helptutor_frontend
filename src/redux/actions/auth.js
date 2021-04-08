import Api from '../../services/Api'
import { returnErrors, createMessage } from './messages'
import axios from 'axios'

import {
  ADD_TUTOR,
  UPDATE_TUTOR,
  GET_TUTOR,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADING,
  LOGOUT_SUCCESS,
  ACTION_RUNNING,
  ACTION_END
} from './types_auth'

export const updateTutor = (data) => (dispatch, getState) => {
  const request = Api.updateTutorInfo(data, getState)
  request
    .then((res) => {
      //console.log(res.data)
      dispatch({
        type: 'UPDATE_TUTOR',
        payload: res.data
      })
      //console.log('UPDATE TUTOR RESPONSE')
      //console.log(res.data)
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

export const getTutorInfo = (id) => (dispatch, getState) => {
  Api.getTutorInfo(id, getState)
    .then((res) => {
      console.log('GET TUTOR INFO')
      console.log(res)
      dispatch({
        type: 'GET_TUTOR',
        payload: res.data
      })
      dispatch({
        type: 'FINISHED_LOADING'
      })
    })
    .catch((err) => {
      dispatch(
        returnErrors({
          non_field_errors: [err.response.data.detail],
          status: err.response.status
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
  // dispatch({ type: USER_LOADING });

  const request = Api.postGoogleTutor(data)
  request
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: 'ADD_TUTOR_GOOGLE',
        payload: res.data
      })
      dispatch(createMessage({ setMessage: 'Tutor registrado con Google' }))
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

/*Login actions*/

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  axios
    .get(
      'https://mdquilindo.pythonanywhere.com/api/auth/user',
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
    .catch((err) => {
      dispatch(returnErrors('Error desconocido', '499'))
    })
}

export const login = (data) => (dispatch) => {
  dispatch({ type: ACTION_RUNNING })

  Api.login(data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch({ type: ACTION_END })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: LOGIN_FAIL
      })
      dispatch({ type: ACTION_END })
    })
    .catch((err) => {
      dispatch(returnErrors('Error desconocido', '499'))
    })
}

export const loginGoogle = (data) => (dispatch) => {
  dispatch({ type: ACTION_RUNNING })
  Api.loginGoogle(data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch({ type: ACTION_END })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: LOGIN_FAIL
      })
      dispatch({ type: ACTION_END })
    })
}

export const logout = () => (dispatch, getState) => {
  let values = {
    dispatchP: dispatch,
    state: getState
  }
  Api.logout(values)
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
    .catch((err) => {
      dispatch(returnErrors('Error desconocido', '499'))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    config.headers['Authorization'] = 'Token ' + token
  }

  return config
}

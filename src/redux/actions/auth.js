import Api from '../../services/Api'
import { createMessage, returnErrors } from './messages'
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
  LOGOUT_SUCCESS
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

/*Login actions*/

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get('api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      })
    })
}

export const login = (data) => (dispatch) => {
  Api.login(data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      })
    })
}

export const loginGoogle = (data) => (dispatch) => {
  Api.loginGoogle(data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      })
    })
}

export const logout = () => (dispatch, getState) => {

  let values = {
    dispatchP: dispatch,
    state: getState 
  }
  Api.logout(values).then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    })
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = 'Token '+token
  }

  return config
}


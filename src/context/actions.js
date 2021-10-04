import {
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOADING_ACTION,
  STOP_ACTION
} from './types'

import config from '../services/ApiConfig'
import Api from '../services/Api'

import { toast } from 'react-toastify'

export const registerUser = (
  dispatch,
  data,
  isTutor = false,
  isGoogle = false
) => {
  const path = isTutor
    ? isGoogle
      ? '/api/tutor/google'
      : '/api/tutor/'
    : isGoogle
    ? '/api/student/google'
    : '/api/student/'
  dispatch({ type: LOADING_ACTION })
  config
    .post(path, data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch({ type: STOP_ACTION })
      toast.success('Bienvenido')
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR
      })
      dispatch({ type: STOP_ACTION })
      if (err.response.data.token) toast.error(err.response.data.token.join())
      if (err.response.data.non_field_errors)
        toast.error(err.response.data.non_field_errors.join())
    })
}

export const loginUser = (dispatch, data, isGoogle = false) => {
  dispatch({ type: USER_LOADING })
  const path = isGoogle ? '/api/auth/login/google' : '/api/auth/login'
  config
    .post(path, data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      toast.success('Bienvenido')
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR
      })
      if (err.response.data.token) toast.error(err.response.data.token.join())
      if (err.response.data.non_field_errors)
        toast.error(err.response.data.non_field_errors.join())
    })
}

export function getUser(dispatch) {
  dispatch({ type: USER_LOADING })
  config
    .get('api/auth/user', Api.AuthHeader())
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR
      })
    })
}

export async function logout(dispatch) {
  dispatch({ type: USER_LOADING })
  config
    .post('api/auth/logout', null, Api.AuthHeader())
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS })
    })
    .catch((err) => {
      console.log(err)
    })
}

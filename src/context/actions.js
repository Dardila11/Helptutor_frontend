import {
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
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
      toast.error(err.response.data.token.join())
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
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR
      })
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

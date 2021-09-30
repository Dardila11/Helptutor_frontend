import {
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from './types'

import config from '../services/ApiConfig'

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
    .get('api/auth/user', tokenConfig())
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
    .post('api/auth/logout', null, tokenConfig())
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const tokenConfig = () => {
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  return config
}

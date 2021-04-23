import Api from 'src/services/Api'
import { launchAlert } from './alerts'

import {
  ADD_TUTOR,
  ADD_STUDENT,
  ADD_TUTOR_GOOGLE,
  ADD_STUDENT_GOOGLE,
  GET_TUTOR,
  UPDATE_TUTOR,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADING,
  LOGOUT_SUCCESS,
  ACTION_RUNNING,
  FINISHED_LOADING,
  ACTION_END
} from '../types/types_auth'

export const updateTutor = (data) => (dispatch, getState) => {
  const request = Api.updateTutorInfo(data, getState)
  request
    .then((res) => {
      console.log('RESPONSE UPDATE TUTOR')
      console.log(res)
      if (res.status === 200) {
        dispatch({
          type: UPDATE_TUTOR,
          payload: res.data
        })
        dispatch(launchAlert('Información del tutor actualizada', res.status))
      }
    })
    .catch((err) => {
      dispatch(launchAlert('Error actualizando información', 400))
    })
}

export const getTutorInfo = (id) => (dispatch, getState) => {
  Api.getTutorInfo(id, getState)
    .then((res) => {
      console.log('RESPONSE GET TUTOR INFO')
      console.log(res)
      dispatch({
        type: GET_TUTOR,
        payload: res.data
      })
      dispatch({
        type: FINISHED_LOADING
      })
    })
    .catch((err) => {
      dispatch(launchAlert('Error registrando tutor', err.response.status))
    })
}
export const addTutor = (data) => (dispatch) => {
  const request = Api.postTutor(data)
  request
    .then((res) => {
      dispatch({
        type: ADD_TUTOR,
        payload: res.data
      })
      dispatch(launchAlert('Tutor registrado', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error registrando tutor', err.response.status))
    })
}

export const addStudent = (data) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.postStudent(data)
  request
    .then((res) => {
      dispatch({
        type: ADD_STUDENT,
        payload: res.data
      })
      dispatch(launchAlert('Estudiante registrado', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error registrando estudiante', err.response.status))
    })
}

export const addTutorGoogle = (data) => (dispatch) => {
  // dispatch({ type: USER_LOADING });

  const request = Api.postGoogleTutor(data)
  request
    .then((res) => {
      dispatch({
        type: ADD_TUTOR_GOOGLE,
        payload: res.data
      })
      dispatch(launchAlert('Tutor registrado con google', 200))
    })
    .catch((err) => {
      if (err.response.status === 400)
        dispatch(launchAlert('El tutor ya existe', err.response.status))
      else
        dispatch(
          launchAlert('Error registrando tutor con google', err.response.status)
        )
    })
}

export const addStudentGoogle = (data) => (dispatch) => {
  // dispatch({ type: USER_LOADING });

  const request = Api.postGoogleStudent(data)
  request
    .then((res) => {
      dispatch({
        type: ADD_STUDENT_GOOGLE,
        payload: res.data
      })
      dispatch(launchAlert('Estudiante registrado con google', 200))
    })
    .catch((err) => {
      if (err.response.status === 400)
        dispatch(launchAlert('El estudiante ya existe', err.response.status))
      else
        dispatch(
          launchAlert('Error registrando estudiante con google', err.response.status)
        )
    })
}

/*Login actions*/

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  Api.getUser(getState)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(
        launchAlert(
          'Error obteniedo información del usuario',
          err.response.status
        )
      )
      dispatch({
        type: AUTH_ERROR
      })
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
      dispatch(launchAlert('Error iniciando sesión', err.response.status))
      dispatch({
        type: LOGIN_FAIL
      })
      dispatch({ type: ACTION_END })
    })
}

export const loginGoogle = (data) => (dispatch) => {
  dispatch({ type: ACTION_RUNNING })
  Api.loginGoogle(data)
    .then((res) => {
      console.log('RESPONSE: LOGIN GOOGLE')
      console.log(res)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch({ type: ACTION_END })
    })
    .catch((err) => {
      dispatch(
        launchAlert('Error iniciando sesión con google', err.response.status)
      )
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
      dispatch(launchAlert('Error al cerrar sesión', err.response.status))
    })
    .catch((err) => {
      dispatch(launchAlert('Error 2 al cerrar sesión', err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

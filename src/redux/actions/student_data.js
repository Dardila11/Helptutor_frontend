import Api from 'src/services/Api'

import { GET_STUDENT, UPDATE_STUDENT } from './types_student'
import { UPDATE_USER_INFORMATION } from './types_auth'
import { launchAlert } from './alerts'

export const getStudentInfo = (id) => (dispatch, getState) => {
  Api.getStudentInfo(id, getState)
      .then((res) => {
        dispatch({
          type: GET_STUDENT,
          payload: res.data
        })
        dispatch({
          type: 'FINISHED_LOADING'
        })
      })
      .catch((err) => {
        dispatch(launchAlert('Error obteniedo información ', err.response.status))
      })
  }

export const updateStudent = (data) => (dispatch, getState) => {
  const request = Api.updateStudentInfo(data, getState)
  request
    .then((res) => {
      dispatch({
        type: UPDATE_STUDENT,
        payload: res.data
      })
      dispatch({
          type: UPDATE_USER_INFORMATION,
          payload: res.data.user
      })
      dispatch(launchAlert('Información actualizada', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error actualizando el estudiante', err.response.status))
    })
}


import Api from 'src/services/Api'

import { GET_TUTOR, UPDATE_TUTOR } from '../types/types_tutor'
import { UPDATE_INFORMATION } from '../types/types_auth'
import { launchAlert } from './alerts'

export const updateTutor = (data) => (dispatch, getState) => {
  const request = Api.updateTutorInfo(data, getState)
  request
    .then((res) => {
      dispatch({
        type: UPDATE_TUTOR,
        payload: res.data
      })
      dispatch({
        type: UPDATE_INFORMATION,
        payload: res.data.user
      })
      dispatch(launchAlert('Información actualizada', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error actualizando tutor', err.response.status))
    })
}

export const getTutorInfo = (id) => (dispatch, getState) => {
  Api.getTutorInfo(id, getState)
    .then((res) => {
      dispatch({
        type: GET_TUTOR,
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

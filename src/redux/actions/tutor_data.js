import Api from '../../services/Api'
import { launchAlert } from './alerts'

export const updateTutor = (data) => (dispatch, getState) => {
  const request = Api.updateTutorInfo(data, getState)
  request
    .then((res) => {
      dispatch({
        type: 'UPDATE_TUTOR',
        payload: res.data
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
        type: 'GET_TUTOR',
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

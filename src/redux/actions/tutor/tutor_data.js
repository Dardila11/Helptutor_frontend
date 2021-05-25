import Api from 'src/services/Api'

import { GET_TUTOR, UPDATE_TUTOR, LOADING } from '../../types/types_tutor'
import { UPDATE_USER_INFORMATION } from '../../types/types_auth'
import { launchAlert } from '../alerts'

export const getTutorInfo = (id) => (dispatch, getState) => {
  Api.getTutorInfo(id, getState)
    .then((res) => {
      dispatch({
        type: GET_TUTOR,
        payload: res.data
      })
      dispatch({
        type: LOADING
      })
    })
    .catch((err) => {
      dispatch(
        launchAlert(
          'Error obteniedo información del tutor',
          err.response.status
        )
      )
    })
}

export const updateTutor = (data, file) => (dispatch, getState) => {
  if(file!==null) {
    const fd = new FormData()
    fd.append('photo', file, file.name)
    data = {...data, photo: fd}
  }  
  console.log(data)
  const request = Api.updateTutorInfo(data, getState)
  request
    .then((res) => {
      console.log(res)
      dispatch({
        type: UPDATE_TUTOR,
        payload: res.data
      })
      dispatch({
        type: UPDATE_USER_INFORMATION,
        payload: res.data.user
      })
      dispatch(launchAlert('Información actualizada', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error actualizando tutor', err.response.status))
    })
}

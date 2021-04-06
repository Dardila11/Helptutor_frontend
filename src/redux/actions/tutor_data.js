import Api from '../../services/Api'
import { returnErrors, createMessage } from './messages'

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

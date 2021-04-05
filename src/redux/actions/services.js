import { valuesIn } from 'lodash-es'
import Api from '../../services/Api'
import { createMessage, returnErrors } from './messages'

import {
    LIST_SERVICES_TUTOR,
    ADD_SERVICE_TUTOR,
    UPDATE_SERVICE_TUTOR,
    DELETE_SERVICE_TUTOR,
    LIST_SPECIALITIES_TUTOR,
    SET_SERVICE_TUTOR,
    SET_IS_CREATE
} from './types_services'

export const getServicesTutor = (pk_tutor) => (dispatch, getState) => {

    let values = {
      dispatchP: dispatch,
      state: getState
    }
    const request = Api.getServicesTutor(values)
    request
      .then((res) => {
            dispatch({
                type: LIST_SERVICES_TUTOR,
                payload: res.data
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

export const addServiceTutor = (data) => (dispatch, getState) => {
  //   dispatch({ type: USER_LOADING });
  let values = {
    dispatchP: dispatch,
    state: getState
  }
  const request = Api.postServiceTutor(data,values)
  request
    .then((res) => {
      dispatch({
        type: ADD_SERVICE_TUTOR,
        payload: res.data
      })
      dispatch(createMessage({ setMessage: 'Servicio registrado' }))
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

export const updateServiceTutor = (data, pk) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.patchServiceTutor(pk, data)
  request
    .then((res) => {
      dispatch({
        type: UPDATE_SERVICE_TUTOR,
        payload: res.data
      })
      dispatch(createMessage({ setMessage: 'Servicio actualizado' }))
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

export const deleteServiceTutor = (pk_service) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.deleteServiceTutor(pk_service)
  request
    .then((res) => {
      dispatch({
        type: DELETE_SERVICE_TUTOR,
        payload: { pk: pk_service }
      })
      dispatch(createMessage({ setMessage: 'Servicio eliminado' }))
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

export const getSpecialitiesTutor = (pk_tutor) => (dispatch) => {

  const request = Api.getTutorKnowledgeAreas(pk_tutor)
  request
    .then((res) => {
      dispatch({
        type: LIST_SPECIALITIES_TUTOR,
        payload: res.data
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

export const setServiceTutor = (tutor) => (dispatch) => {
  dispatch({
    type: SET_SERVICE_TUTOR,
    payload: tutor
  })
}

export const setIsCreate = (value) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });
  dispatch({
    type: SET_IS_CREATE,
    payload: value
  })
}

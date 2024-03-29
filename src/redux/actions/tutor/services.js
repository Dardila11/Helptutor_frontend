import Api from 'src/services/Api'
import { launchAlert } from '../alerts'

import {
  LIST_SERVICES_TUTOR,
  ADD_SERVICE_TUTOR,
  UPDATE_SERVICE_TUTOR,
  DELETE_SERVICE_TUTOR,
  LIST_SPECIALITIES_TUTOR,
  SET_SERVICE_TUTOR,
  SET_IS_CREATE
} from '../../types/types_services'

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
      dispatch(launchAlert('Error obteniedo servicios', err.response.status))
    })
}

export const addServiceTutor = (data) => (dispatch, getState) => {
  //   dispatch({ type: USER_LOADING });
  let values = {
    dispatchP: dispatch,
    state: getState
  }
  const request = Api.postServiceTutor(data, values)
  request
    .then((res) => {
      dispatch({
        type: ADD_SERVICE_TUTOR,
        payload: res.data
      })
      dispatch(launchAlert('Servicio registrado', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error agregando servicio', err.response.status))
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
      dispatch(launchAlert('Servicio actualizado', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error actualizando servicio', err.response.status))
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
      dispatch(launchAlert('Servicio eliminado', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error eliminando servicio', err.response.status))
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
        launchAlert('Error obteniendo especialidades', err.response.status)
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

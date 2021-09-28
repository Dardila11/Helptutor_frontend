import Api from 'src/services/Api'
import { launchAlert } from '../alerts'

import {
  ADD_NOMINATION,
  GET_NOMINATION,
  GET_NOMINATIONS,
  DELETE_NOMINATION,
  UPDATE_NOMINATION,
  GET_PUBLICATIONS,
  LOADING
} from 'src/redux/types/types_nomination'

export const getPublications = () => (dispatch, getState) => {
  Api.getOffers(getState)
    .then((res) =>
      dispatch({
        type: GET_PUBLICATIONS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        launchAlert('Error obteniedo publicaciones', err.response.status)
      )
    })
}

export const addNomination = (data) => (dispatch, getState) => {
  Api.postNomination(data, getState)
    .then((res) => {
      dispatch({
        type: ADD_NOMINATION,
        payload: res.data
      })
      dispatch(launchAlert('Postulacion agregada', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error agregando postulación', err.response.status))
    })
}

export const getNomination = (id) => (dispatch, getState) => {
  Api.getNomination(id, getState)
    .then((res) => {
      dispatch({
        type: GET_NOMINATION,
        payload: res.data
      })
      dispatch({
        type: LOADING
      })
    })
    .catch((err) => {
      dispatch(launchAlert('Error obteniendo nominación', err.response.status))
    })
}

export const getNominations = () => (dispatch, getState) => {
  Api.getNominations(getState)
    .then((res) => {
      dispatch({
        type: GET_NOMINATIONS,
        payload: res.data
      })
      dispatch({
        type: LOADING
      })
    })
    .catch((err) => {
      dispatch(
        launchAlert('Error obteniendo postulaciones', err.response.status)
      )
    })
}

export const updateNomination = (id, data) => (dispatch, getState) => {
  Api.patchNomination(id, data, getState)
    .then((res) => {
      dispatch({
        type: UPDATE_NOMINATION,
        payload: res.data
      })
      dispatch(launchAlert('Nominación actualizada', 200))
    })
    .catch((err) => {
      dispatch(
        launchAlert('Error actualizando nominación', err.response.status)
      )
    })
}

export const deleteNomination = (id) => (dispatch, getState) => {
  Api.deleteNomination(id, getState)
    .then((res) => {
      dispatch({
        type: DELETE_NOMINATION,
        payload: { pk: id }
      })
      dispatch(launchAlert('Nominación eliminada', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error eliminanco nominación', err.response.status))
    })
}

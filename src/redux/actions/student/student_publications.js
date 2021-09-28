import Api from 'src/services/Api'
import { launchAlert } from '../alerts'

import {
  ADD_PUBLICATION,
  LIST_PUBLICATIONS,
  CREATING,
  UPDATE_PUBLICATION,
  DELETE_PUBLICATION,
  GET_NOMINATIONS,
  GET_TUTOR,
  LOADING,
  LOADING_NOMINATIONS
} from 'src/redux/types/types_publications'

export const addPublication = (data) => (dispatch, getState) => {
  const request = Api.postOffer(data, getState)
  request
    .then((res) => {
      dispatch({
        type: CREATING
      })
      dispatch({
        type: ADD_PUBLICATION,
        payload: res.data
      })
      dispatch(launchAlert('Oferta publicada', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error publicando la oferta', err.response.status))
    })
}

export const getPublications = () => (dispatch, getState) => {
  Api.getOffers(getState)
    .then((res) =>
      dispatch({
        type: LIST_PUBLICATIONS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        launchAlert('Error obteniedo publicaciones', err.response.status)
      )
    })
}

export const updatePublication = (id, data) => (dispatch, getState) => {
  Api.patchOffer(id, data, getState)
    .then((res) => {
      dispatch({
        type: UPDATE_PUBLICATION,
        payload: res.data
      })
      dispatch(launchAlert('Publicación actualizada', 200))
    })
    .catch((err) => {
      dispatch('Error actualizando publicación', err.response.status)
    })
}

export const deletePublication = (id) => (dispatch, getState) => {
  Api.deleteOffer(id, getState)
    .then((res) => {
      dispatch({
        type: DELETE_PUBLICATION,
        payload: res.data
      })
      dispatch(launchAlert('Publicación eliminada', 200))
    })
    .catch((err) => {
      dispatch(launchAlert('Error eliminando publicación', err.response.status))
    })
}

export const getPublicationNominations = (id) => (dispatch, getState) => {
  Api.getOfferNominations(id, getState)
    .then((res) => {
      dispatch({
        type: GET_NOMINATIONS,
        payload: res.data
      })
      dispatch({
        type: LOADING_NOMINATIONS
      })
    })
    .catch((err) => {
      dispatch('Error obteniendo postulaciones', err.response.status)
    })
}

export const getTutorSelectedInfo = (id) => (dispatch, getState) => {
  Api.getTutorInfo(id, getState)
    .then((res) => {
      dispatch({
        type: LOADING
      })
      dispatch({
        type: GET_TUTOR,
        payload: res.data
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
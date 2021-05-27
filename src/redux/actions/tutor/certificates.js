import Api from 'src/services/Api'
import { launchAlert } from '../alerts'

import {
  LIST_CERTIFICATES,
  ADD_CERTIFICATE,
  DELETE_CERTIFICATE,
  UPDATE_CERTIFICATE
} from '../../types/types_certificates'

export const getCertificates = (id) => (dispatch, getState) => {
  Api.getCertificates(id, getState)
    .then((res) => {
      dispatch({
        type: LIST_CERTIFICATES,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(
        launchAlert('Error obteniendo certificados', err.response.status)
      )
    })
}

export const AddCertificate = (data) => (dispatch) => {
  dispatch(launchAlert('Certificado agregado', 200))
  dispatch({ type: ADD_CERTIFICATE, payload: data})
  /*
  Api.AddCertificate(data, getState)
    .then((res) => {
      dispatch(
        launchAlert('Certificado agregado', 200)
      )
    })
    .catch((err) => {
      dispatch(
        launchAlert('Error agregando certificado', err.response.status)
      )
    })*/
}

export const DeleteCertificate = (id) => (dispatch) => {
  dispatch(launchAlert('Certificado eliminado', 200))
  dispatch({ type: DELETE_CERTIFICATE, payload: id})
  /*
  Api.deleteCertificate(data, getState)
    .then((res) => {
      dispatch(
        launchAlert('Certificado eliminado', 200)
      )
    })
    .catch((err) => {
      dispatch(
        launchAlert('Error eliminando certificado', err.response.status)
      )
    })*/
}

export const UpdateCertificate = (certificate) => (dispatch) => {
  dispatch({ type: UPDATE_CERTIFICATE, payload: certificate})
  dispatch(launchAlert('Certificado actualizado', 200))
  /*
  Api.patchCertificate(data, getState)
    .then((res) => {
      dispatch(
        launchAlert('Certificado actualizado', 200)
      )
    })
    .catch((err) => {
      dispatch(
        launchAlert('Error actualizando certificado', err.response.status)
      )
    })*/
}


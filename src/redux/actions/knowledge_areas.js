import Api from '../../services/Api'
import { createMessage, returnErrors } from './messages'

import {
  LIST_KNOWLEDGEAREAS,
  LIST_SPECIALITIES,
  ADD_SPECIALITY_TUTOR,
  DELETE_SPECIALITY_TUTOR,
  LIST_SPECIALITIES_TUTOR
} from './types_knowledge_areas'

export const getKnowledgeAreas = () => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.getknowledgeAreas()
  request
    .then((res) => {
      dispatch({
        type: LIST_KNOWLEDGEAREAS,
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

export const getSpecialities = (pk_knowledge_area) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.getSubKnowledgeAreas(pk_knowledge_area)
  request
    .then((res) => {
      dispatch({
        type: LIST_SPECIALITIES,
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

export const AddSpecialityTutor = (data) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.postKnowledgeAreaTutor(data)
  request
    .then((res) => {
      dispatch({
        type: ADD_SPECIALITY_TUTOR,
        payload: res.data
      })
      dispatch(createMessage({ setMessage: 'Especialidad registrada' }))
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

export const deleteSpecialityTutor = (pk_knowledge_area) => (dispatch) => {
  //   dispatch({ type: USER_LOADING });

  const request = Api.deleteTutorKnowledgeArea(pk_knowledge_area)
  request
    .then((res) => {
      dispatch({
        type: DELETE_SPECIALITY_TUTOR,
        payload: { pk: pk_knowledge_area }
      })
      dispatch(createMessage({ setMessage: 'Especialidad eliminada' }))
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
  //   dispatch({ type: USER_LOADING });

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

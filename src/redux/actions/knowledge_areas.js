import Api from '../../services/Api'
import { /* createMessage */ returnErrors } from './messages'

import {
  LIST_KNOWLEDGEAREAS,
  LIST_SPECIALITIES
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

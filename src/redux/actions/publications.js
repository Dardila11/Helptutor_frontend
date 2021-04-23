import Api from 'src/services/Api'
import { launchAlert } from './alerts'

import {
  ADD_PUBLICATION,
  LIST_PUBLICATIONS,
  CREATING
} from '../types/types_publications'

export const addPublication = (data) => (dispatch, getState) => {
    const request = Api.postPublication(data,getState)
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
            dispatch(
                launchAlert('Error publicando la oferta', err.response.status)
            )
        })
}

export const getPublications = () => (dispatch, getState) => {
    Api.getOffers(getState).then((res) => (
        dispatch({
            type: LIST_PUBLICATIONS,
            payload: res.data
        })
    )).catch((err) => {
        dispatch(
            launchAlert('Error obteniedo publicaciones', err.response.status)
        )
    })
} 
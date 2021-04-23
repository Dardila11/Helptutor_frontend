import Api from 'src/services/Api'
import { launchAlert } from './alerts'

import {
    ADD_ADVERTISEMENT, LIST_ADVERTISEMENTS, CREATING_ADVERTISEMENT, GET_ANSWERS, GET_STUDENT_ADVERTISEMENT  , CLEAR_ANSWERS, LOADING_ADVERTISEMENT
} from './types_advertisements'

export const addAdvertisement = (data) => (dispatch, getState) => {
    const request = Api.postAdvertisement(data,getState)
    request
        .then((res) => {
            dispatch({
                type: CREATING_ADVERTISEMENT
            })
            dispatch({
                type: ADD_ADVERTISEMENT,
                payload: res.data
            })
            dispatch(launchAlert('Anuncio publicado', 200))
        })
        .catch((err) => {
            console.log(err.response)
            dispatch(
                launchAlert('Error publicando el anuncio', err.response.status)
            )
        })
}

export const getAdvertisements = () => (dispatch, getState) => {
    Api.getAdvertisements(getState).then((res) => (
        dispatch({
            type: LIST_ADVERTISEMENTS,
            payload: res.data
        })
    )).catch((err) => {
        dispatch(
            launchAlert('Error obteniedo anuncios', err.response.status)
        )
    })
} 

export const getAdvertisementAnswers = (idAdvertisement) => (dispatch, getState) => {
    console.log('Advertisement action id: '+idAdvertisement)
    Api.getAdvertisementAnswers(idAdvertisement,getState).then((res) => {
        console.log(res.data)
        dispatch({
            type: GET_ANSWERS,
            payload: res.data
        })
    }).catch((err) => {
        dispatch(
            launchAlert('Error obteniendo respuestas', err.response.status)
        )
    })
}

export const getStudent = (id) => (dispatch, getState) => {
    console.log('get student into action')
    console.log(id)
    Api.getStudent(id, getState).then((res) => {
        console.log(res.data)
        dispatch({
            type: GET_STUDENT_ADVERTISEMENT,
            payload: res.data
        })
        dispatch({
            type: LOADING_ADVERTISEMENT
        })
    }).catch((err) => {
        dispatch(
            launchAlert('Error obteniendo estudiante', err.response.status)
        )
    })
}

export const clearAnswers = () => (dispatch) =>{
    dispatch({
        type: CLEAR_ANSWERS
    })
}
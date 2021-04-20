import Api from 'src/services/Api'
import { launchAlert } from './alerts'

import {
    ADD_ADVERTISEMENT, LIST_ADVERTISEMENTS, CREATING_ADVERTISEMENT
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
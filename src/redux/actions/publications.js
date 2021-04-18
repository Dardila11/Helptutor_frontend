import Api from 'src/services/Api'
import { launchAlert } from './alerts'

import {
    ADD_PUBLICATION,
} from './types_publications'

export const addPublication = (data) => (dispatch, getState) => {
    let values = {
        dispatchP: dispatch,
        state: getState
    }
    console.log(data)
    console.log(values)
    const request = Api.postPublication(data,values)
    request
        .then((res) => {
            console.log(res)
            dispatch({
                type: ADD_PUBLICATION,
                payload: res.data
            })
            dispatch(launchAlert('Oferta publicada', 200))
        })
        .catch((err) => {
            console.log(err.response)
            dispatch(
                launchAlert('Error publicando la oferta', err.response.status)
            )
        })
}
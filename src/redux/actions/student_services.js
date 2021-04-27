import Api from 'src/services/Api'

import { GET_SERVICES, LOADING_SERVICES } from 'src/redux/types/types_student_services'
import { launchAlert } from './alerts'

export const getServices = () => (dispatch, getState) => {
    Api.getServices(getState)
        .then((res) => {
            dispatch({
                type: GET_SERVICES,
                payload: res.data
            })
            dispatch({
                type: LOADING_SERVICES
            })
        })
        .catch((err) => {
            dispatch(launchAlert('Error obteniendo servicios', err.response.status))
        })
}
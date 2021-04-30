import Api from 'src/services/Api'
import { launchAlert } from '../alerts'

import { GET_TUTORS } from '../../types/types_tutors'

export const getTutors = () => (dispatch, getState) => {  
    const request = Api.getTutors(getState)
    request
        .then((res) => {
            dispatch({
                type: GET_TUTORS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch(
                launchAlert('Error onteniendo tutores', 400)
            )
        })
}
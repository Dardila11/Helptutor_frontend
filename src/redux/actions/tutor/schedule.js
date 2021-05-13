import Api from 'src/services/Api'
import { launchAlert } from '../alerts'
import {
    GET_SCHEDULE,
    LOADING,
    SAVE_SCHEDULE
  } from 'src/redux/types/types_schedule'

export const getSchedule = (idTutor) => (dispatch, getState) => {
    Api.getSchedule(idTutor,getState)
        .then((res)=>{
            dispatch({
                type: GET_SCHEDULE,
                payload: res.data
            })
            dispatch({
                type: LOADING
            })
        })
        .catch((err) => {
            dispatch(launchAlert('Error obteniendo el horario', err.response.status))
        })
}

export const saveSchedule = (data) => (dispatch) => {
    dispatch({
        type: SAVE_SCHEDULE,
        payload: data
    })
}
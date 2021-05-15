import Api from 'src/services/Api'
import { launchAlert } from '../alerts'
import {
    GET_SCHEDULE,
    LOADING,
    SAVE_SCHEDULE,
    ADD_SLOT,
    DELETE_SLOT
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
    if(data.length===0){
        dispatch(launchAlert('Tu horario esta vacío', 500))
        dispatch({
            type: SAVE_SCHEDULE,
            payload: data
            })
    }
    else {
        dispatch({
        type: SAVE_SCHEDULE,
        payload: data
        })
        dispatch(launchAlert('Horario guardado', 200))
    }
}

export const addSlot = (slot) => (dispatch) => {
    dispatch({
        type: ADD_SLOT,
        payload: slot
    })
}

export const deleteSlot = (slot) => (dispatch) => {
    dispatch({
        type: DELETE_SLOT,
        payload: slot
    })
}
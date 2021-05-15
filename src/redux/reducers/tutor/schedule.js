import {
    GET_SCHEDULE,
    LOADING,
    SAVE_SCHEDULE,
    ADD_SLOT,
    DELETE_SLOT
  } from 'src/redux/types/types_schedule'
  
  const initialState = {
    schedule: [],
    loading: true
  }
  
  const schedule = (state = initialState, action) => {
    switch (action.type) {
      case GET_SCHEDULE:
        return {
          ...state,
          schedule: action.payload
        }
      case LOADING:
        return {
          ...state,
          loading: false
        }
      case SAVE_SCHEDULE:
          return {
              ...state,
              schedule: action.payload
          }
      case ADD_SLOT:
        let scheA = state.schedule
        scheA.push(action.payload)
        return {
          ...state,
          schedule: scheA
        }
      case DELETE_SLOT:
        let scheD = state.schedule.filter((slot) => slot.id!==action.payload.id)
        return {
          ...state,
          schedule: scheD
        }
      default:
        return state
    }
  }
  
  export default schedule
  
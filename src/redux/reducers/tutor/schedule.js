import {
    GET_SCHEDULE,
    LOADING,
    SAVE_SCHEDULE
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
      default:
        return state
    }
  }
  
  export default schedule
  
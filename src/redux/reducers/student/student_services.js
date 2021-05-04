import {
  GET_SERVICES,
  LOADING_SERVICES
} from 'src/redux/types/types_student_services'

const initialState = {
  services: [],
  loading: true
}

const studentServices = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload
      }
    case LOADING_SERVICES:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default studentServices

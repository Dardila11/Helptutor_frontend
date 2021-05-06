import { GET_TUTORS, LOADING } from 'src/redux/types/types_tutors'

const initialState = {
  tutors: [],
  loading: true
}

const tutorsInfo = (state = initialState, action) => {
  switch (action.type) {
    case GET_TUTORS:
      return {
        ...state,
        tutors: action.payload,
        loading: false
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default tutorsInfo

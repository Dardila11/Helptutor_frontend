import {
  LIST_PUBLICATIONS,
  ADD_PUBLICATION,
  SET_IS_CREATE,
  CREATING,
  DELETE_PUBLICATION,
  GET_NOMINATIONS,
  UPDATE_PUBLICATION,
  GET_TUTOR,
  LOADING
} from 'src/redux/types/types_publications'

const initialValues = {
  title: '',
  description: '',
  user: -1
}

const initialState = {
  publications: [],
  publication: initialValues,
  is_create: true,
  loadingPublications: true,
  creating: false,
  nominations: [],
  loadingTutor: true,
  tutorInfo: {}
}

const publications = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
        loadingPublications: false
      }
    case ADD_PUBLICATION:
      return {
        ...state,
        publications: state.publications.concat(action.payload),
        creating: false
      }
    case SET_IS_CREATE:
      if (action.payload) {
        return {
          ...state,
          publication: initialValues,
          is_create: action.payload
        }
      } else {
        return {
          ...state,
          publication: state.publication,
          is_create: action.payload
        }
      }
    case GET_NOMINATIONS: {
      return {
        ...state,
        nominations: action.payload
      }
    }
    case UPDATE_PUBLICATION: {
      const publications = state.publications.map((item) => {
        if (item.id === action.payload.id) return { ...action.payload }
        return item
      })
      return {
        ...state,
        is_create: false,
        publications: publications
      }
    }
    case DELETE_PUBLICATION:
      return {
        ...state,
        services_tutor: state.services_tutor.filter(
          (item) => item.id !== action.payload.pk
        )
      }
    case CREATING: {
      return {
        ...state,
        creating: true
      }
    }
    case GET_TUTOR:
      console.log(state.tutorInfo)
      return {
        ...state,
        tutorInfo: action.payload,
        loadingTutor: false
      }
    case LOADING:
      return {
        ...state,
        loadingTutor: true
      }
    default:
      return state
  }
}

export default publications

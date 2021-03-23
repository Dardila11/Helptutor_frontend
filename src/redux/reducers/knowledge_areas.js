import { CallToActionSharp } from '@material-ui/icons'
import {
  ADD_SPECIALITY_TUTOR,
  DELETE_SPECIALITY_TUTOR,
  LIST_KNOWLEDGEAREAS,
  LIST_SPECIALITIES,
  LIST_SPECIALITIES_TUTOR
} from '../actions/types_knowledge_areas'

const initialState = {
  knowledge_areas: [],
  specialities: [],
  specialities_tutor: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_KNOWLEDGEAREAS:
      return {
        ...state,
        knowledge_areas: action.payload
      }
    case LIST_SPECIALITIES:
      return {
        ...state,
        specialities: action.payload
      }
    case ADD_SPECIALITY_TUTOR:
      return {
        ...state,
        specialities_tutor: state.specialities_tutor.concat(action.payload)
      }
    case DELETE_SPECIALITY_TUTOR:
      console.log(action.payload);
      return {
        ...state,
        specialities_tutor: state.specialities_tutor.filter(item => item.id !== action.payload.pk)
      }
    case LIST_SPECIALITIES_TUTOR:
      return {
        ...state,
        specialities_tutor: action.payload
      }
    //   case ACTION_RUNNING:
    //     return {
    //       ...state,
    //       isRunning: true,
    //     };
    //   case ACTION_END:
    //     return {
    //       ...state,
    //       isRunning: false,
    //     };
    default:
      return state
  }
}

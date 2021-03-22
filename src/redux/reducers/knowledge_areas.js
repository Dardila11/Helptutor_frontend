import {
  LIST_KNOWLEDGEAREAS,
  LIST_SPECIALITIES
} from '../actions/types_knowledge_areas'

const initialState = {
  knowledge_areas: [],
  specialities: []
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

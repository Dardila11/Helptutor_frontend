import {
  ADD_SPECIALITY_TUTOR,
  DELETE_SPECIALITY_TUTOR,
  LIST_KNOWLEDGEAREAS,
  LIST_SPECIALITIES,
  LIST_SPECIALITIES_TUTOR,
  SET_SPECIALITY_TUTOR,
  SET_IS_CREATE,
  UPDATE_SPECIALITY_TUTOR
} from '../actions/types_knowledge_areas'

const initialValuesSpeciality = {
    id: -1,
    knowledge_area: -1,
    speciality: -1,
    tags: '',
    description: ''
}

const initialState = {
  knowledge_areas: [],
  specialities: [],
  specialities_tutor: [],
  speciality_tutor: initialValuesSpeciality,
  is_create: true
}

const knowledge_area = (state = initialState, action) => {
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
    case UPDATE_SPECIALITY_TUTOR:
      const specialities_tutor = state.specialities_tutor.map((item) => {
        if (item.id === action.payload.id) return { ...action.payload }
        return item
      })
      return {
        ...state,
        is_create: true,
        specialities_tutor: specialities_tutor
      }
    case DELETE_SPECIALITY_TUTOR:
      return {
        ...state,
        specialities_tutor: state.specialities_tutor.filter(
          (item) => item.id !== action.payload.pk
        )
      }
    case LIST_SPECIALITIES_TUTOR:
      return {
        ...state,
        specialities_tutor: action.payload
      }
    case SET_SPECIALITY_TUTOR:
      const data = action.payload
      const speciality_tutor = {
        id: data.id,
        knowledge_area: data.knowledge_area.knowledge_area[0],
        speciality: data.knowledge_area.id,
        tags: data.tags,
        description: data.description
      }
      return {
        ...state,
        speciality_tutor: speciality_tutor,
        is_create: false
      }
    case SET_IS_CREATE:
      if(action.payload){
        return {
          ...state, speciality_tutor: initialValuesSpeciality, is_create: action.payload
        }
      }else{
        return {
          ...state, speciality_tutor: speciality_tutor, is_create: action.payload
        }
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

export default knowledge_area

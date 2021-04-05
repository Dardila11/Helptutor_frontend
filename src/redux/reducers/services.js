import {
    LIST_SERVICES_TUTOR,
    ADD_SERVICE_TUTOR,
    UPDATE_SERVICE_TUTOR,
    DELETE_SERVICE_TUTOR,
    LIST_SPECIALITIES_TUTOR,
    SET_SERVICE_TUTOR,
    SET_IS_CREATE
} from '../actions/types_services'

const initialValuesService = {
    id: -1,
    title: '',
    speciality: -1,
    description: '',
    price: ''
}

const initialState = {
    services_tutor: [],
    specialities_tutor: [],
    service_tutor: initialValuesService,
    is_create: true
}

const services = (state = initialState, action) =>{
    switch (action.type) {
        case LIST_SERVICES_TUTOR:
            return {
                ...state,
                services_tutor: action.payload
            }
        case ADD_SERVICE_TUTOR:
            return{
                ...state,
                services_tutor: state.services_tutor.concat(action.payload)
            }
        case UPDATE_SERVICE_TUTOR:
            const services_tutor = state.services_tutor.map((item) => {
                if (item.id === action.payload.id) return {...action.payload}
                return item
            })
            return {
                ...state,
                is_create: true,
                services_tutor: services_tutor
            }
        case DELETE_SERVICE_TUTOR:
            return {
                ...state,
                services_tutor: state.services_tutor.filter(
                    (item) => item.id !== action.payload.pk
                )
            }
        case LIST_SPECIALITIES_TUTOR:
            return {
                ...state,
                specialities_tutor: action.payload
            }
        case SET_SERVICE_TUTOR:
            const data = action.payload
            const service_tutor = {
                id: data.id,
                title: data.title,
                speciality: data.speciality,
                description: data.description,
                price: data.price
            }
            return {
            ...state,
            service_tutor: service_tutor,
            is_create: false
            }
        case SET_IS_CREATE:
            if(action.payload){
                return {
                ...state, service_tutor: initialValuesService, is_create: action.payload
                }
            }else{
                return {
                ...state, service_tutor: service_tutor, is_create: action.payload
                }
            }
        default:
            return state
    }
}

export default services
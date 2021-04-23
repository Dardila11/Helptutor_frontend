import {
    LIST_ADVERTISEMENTS,
    ADD_ADVERTISEMENT,
    SET_IS_CREATE,
    CREATING_ADVERTISEMENT,
    GET_ANSWERS,
    GET_STUDENT_ADVERTISEMENT,
    CLEAR_ANSWERS,
    LOADING_ADVERTISEMENT
} from 'src/redux/actions/types_advertisements'

const initialValues = {
    title: '',
    description: '',
    student: {},
    answers: [],
    loading: true
}

const initialState = {
    advertisements: [],
    advertisement: initialValues,
    is_create: true,
    loadingAdvertisement: true,
    creating: false
}

const advertisements = (state = initialState, action) => {
    switch (action.type){
        case LIST_ADVERTISEMENTS:
            return {
                ...state,
                advertisements: action.payload,
                loadingAdvertisement: false,
            }
        case ADD_ADVERTISEMENT:
            return {
                ...state,
                advertisements: state.advertisements.concat(action.payload),
                creating: false
            }
        case SET_IS_CREATE:
            if(action.payload){
                return {
                ...state, advertisement: initialValues, is_create: action.payload
                }
            }else{
                return {
                ...state, advertisement: state.advertisement, is_create: action.payload
                }
            }
        case CREATING_ADVERTISEMENT: {
            return{
                ...state,
                creating: true
            }
        }
        case GET_ANSWERS: {
            let advertisement = state.advertisement
            advertisement.answers = action.payload
            return{
                ...state,
                advertisement: advertisement
            }
        }
        case GET_STUDENT_ADVERTISEMENT: {
            let advertisement = state.advertisement
            advertisement = {...advertisement,
                                student: action.payload}
            return{
                ...state,
                advertisement: advertisement
            }
        }
        case CLEAR_ANSWERS: {
            let advertisement = initialValues
            return{
                ...state,
                advertisement: advertisement
            }
        }
        case LOADING_ADVERTISEMENT: {
            let advertisement = state.advertisement
            advertisement = {
                ...advertisement,
                loading: false
            }
            return{
                ...state,
                advertisement: advertisement
            }
        }
        default:
            return state
    }
}

export default advertisements
import { ADD_NOMINATION, DELETE_NOMINATION, UPDATE_NOMINATION, GET_NOMINATION, GET_NOMINATIONS, LOADING, GET_PUBLICATIONS } from 'src/redux/types/types_nomination'

const initialState = {
    publications: [],
    publication: null,
    nominations: [],
    nomination: null,
    list: [],
    loading: true
}

const nominations = (state =  initialState, action) => {
    switch (action.type){
        case ADD_NOMINATION:
            return {
                ...state,
                nominations: state.nominations.concat(action.payload)
            }
        case UPDATE_NOMINATION:
            const nominations = state.nominations.map((item) => {
                if (item.id === action.payload.id) return {...action.payload}
                return item
            })
            return {
                ...state,
                nominations: nominations
            }
        case GET_NOMINATION: 
            return {
                ...state,
                nomination: action.payload
            }
        case GET_NOMINATIONS:
            return {
                ...state,
                nominations: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: false
            }               
        case DELETE_NOMINATION:
            return {
                ...state,
                nominations: state.nominations.filter(
                    (item) => item.id !== action.payload.pk
                )
            }
        case GET_PUBLICATIONS:
            return {
                ...state,
                publications: action.payload
            }
        default:
            return state
    }
}

export default nominations
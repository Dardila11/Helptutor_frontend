import { ADD_NOMINATION, DELETE_NOMINATION, UPDATE_NOMINATION } from 'src/redux/types/types_nomination'

const initialValues = {
    price: '',
    description: ''
}

const initialState = {
    nominations: [],
    nomination: initialValues
}

const nominations = (state =  initialState, action) => {
    switch (action.type){
        case ADD_NOMINATION:
            return {
                ...state,
                nominations: state.nomination.concat(action.payload)
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
               
        case DELETE_NOMINATION:
            return {
                ...state,
                nominations: state.nominations.filter(
                    (item) => item.id !== action.payload.pk
                )
            }
    }
}
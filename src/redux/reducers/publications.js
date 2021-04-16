import {
    LIST_PUBLICATIONS,
    ADD_PUBLICATION,
    SET_IS_CREATE
} from 'src/redux/actions/types_publications'

const initialValues = {
    title: '',
    description: '',
    user: -1
}

const initialState = {
    publications: [],
    publication: initialValues,
    is_create: true
}

const publications = (state = initialState, action) => {
    switch (action.type){
        case LIST_PUBLICATIONS:
            return {
                ...state,
                publications: action.payload
            }
        case ADD_PUBLICATION:
            return {
                ...state,
                publications: state.publications.concat(action.payload)
            }
        case SET_IS_CREATE:
            if(action.payload){
                return {
                ...state, publication: initialValues, is_create: action.payload
                }
            }else{
                return {
                ...state, publication: state.publication, is_create: action.payload
                }
            }
        default:
            return state
    }
}

export default publications
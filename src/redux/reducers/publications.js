import {
    LIST_PUBLICATIONS,
    ADD_PUBLICATION,
    SET_IS_CREATE,
    CREATING
} from 'src/redux/actions/types_publications'

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
    creating: false
}

const publications = (state = initialState, action) => {
    switch (action.type){
        case LIST_PUBLICATIONS:
            return {
                ...state,
                publications: action.payload,
                loadingPublications: false,
            }
        case ADD_PUBLICATION:
            return {
                ...state,
                publications: state.publications.concat(action.payload),
                creating: false
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
        case CREATING: {
            return{
                ...state,
                creating: true
            }
        }
        default:
            return state
    }
}

export default publications
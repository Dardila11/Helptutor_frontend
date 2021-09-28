import {
    SEARCH_WORD,
    TYPE_FILTER
} from 'src/redux/types/search_types'

export const search_word = (word) => (dispatch) => {
    dispatch({type: SEARCH_WORD, payload: word})
}

export const select_by = (type) => (dispatch) => {
    dispatch({type: TYPE_FILTER, payload: type})
}
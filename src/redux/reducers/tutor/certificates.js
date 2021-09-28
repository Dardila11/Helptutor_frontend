import {
    LIST_CERTIFICATES,
    ADD_CERTIFICATE,
    DELETE_CERTIFICATE,
    UPDATE_CERTIFICATE
  } from '../../types/types_certificates'

const initialState = {
    certificateslist: []
}

const certificates = (state = initialState, action) => {
    switch (action.type) {
        case LIST_CERTIFICATES:
            return {
            ...state,
            certificateslist: action.payload
            }
        case ADD_CERTIFICATE:
            return {
                ...state,
                certificateslist: state.certificateslist.concat(action.payload)
            }
        case UPDATE_CERTIFICATE:
            const certificateslist = state.certificateslist.map((item) => {
                if (item.title === action.payload.title) return { ...action.payload }
                return item
            })
            return {
                ...state,
                certificateslist: certificateslist
            }
        case DELETE_CERTIFICATE:
            return {
                ...state,
                certificateslist: state.certificateslist.filter(
                (item) => item.title !== action.payload)
            }
        default:
            return state
    }
}

export default certificates
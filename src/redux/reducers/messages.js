import { CREATE_MESSAGE } from '../actions/types_messages';

const initialState = {};

const messageReducer = (state = initialState, action) =>{
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}

export default messageReducer
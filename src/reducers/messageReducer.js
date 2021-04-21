import {
    ADD_MESSAGE
  } from "../constants/messageConstants";

function allMessagesReducer(state = {}, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            console.log(state.messages);
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            };
        default: return state;
    }
}

export {
    allMessagesReducer
}
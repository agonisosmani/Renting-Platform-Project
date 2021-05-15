function messageListReducer(state= { messages:[] }, action) {
    switch (action.type) {
        case 'SHPALLJA_NOT_FOUND_LIST_REQUEST':
          return { loading: true, messages: [] }
        case 'SHPALLJA_NOT_FOUND_LIST_SUCCESS':
          return { loading: false, messages: action.payload }
        case 'SHPALLJA_NOT_FOUND_LIST_FAIL':
          return { loading: false, error: action.payload }
        default:
          return state;
    }
}

function deleteMessageReducer(state={ message: {}}, action) {
    switch (action.type) {
        case 'DELETE_MESSAGE_REQUEST':
        return { loading: true };
        case 'DELETE_MESSAGE_SUCCESS':
        return { loading: false, success: true};
        case 'DELETE_MESSAGE_FAIL':
        return { loading: false, error: action.payload };
        default: return state;
    }
}
    
export { messageListReducer, deleteMessageReducer };
function userListReducer(state= { users:[] }, action) {
    switch (action.type) {
        case 'USER_LIST_REQUEST':
            return { loading: true, users: [] }
        case 'USER_LIST_SUCCESS':
            return { loading: false, users: action.payload }
        case 'USER_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function userSignInReducer(state={}, action) {
    switch (action.type) {
        case 'USER_SIGNIN_REQUEST':
            return { loading: true }
        case 'USER_SIGNIN_SUCCESS':
            return { loading: false, userInfo: action.payload };
        case 'USER_SIGNIN_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_LOGOUT':
            return {};
        default:
            return state;
    }
}

function userRegisterReducer(state={}, action) {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true }
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, userInfo: action.payload };
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function userUpdateReducer(state={}, action) {
    switch (action.type) {
        case 'USER_UPDATE_REQUEST':
            return { loading: true };
        case 'USER_UPDATE_SUCCESS':
            return { loading: false, userInfo: action.payload, success: true};
        case 'USER_UPDATE_FAIL':
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function deleteUserReducer(state={ user: {}}, action) {
    switch (action.type) {
      case 'DELETE_USER_REQUEST':
        return { loading: true };
      case 'DELETE_USER_SUCCESS':
        return { loading: false, success: true};
      case 'DELETE_USER_FAIL':
        return { loading: false, error: action.payload };
      default: return state;
    }
}

export { userListReducer, userSignInReducer, userRegisterReducer, userUpdateReducer, deleteUserReducer }
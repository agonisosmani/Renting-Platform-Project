function komunaListReducer(state= { komunat:[] }, action) {
    switch (action.type) {
        case 'KOMUNA_LIST_REQUEST':
            return { loading: true, komunat: [] }
        case 'KOMUNA_LIST_SUCCESS':
            return { loading: false, komunat: action.payload }
        case 'KOMUNA_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function createKomunReducer(state = {}, action) {
  switch(action.type) {
      case 'KOMUNA_CREATE_REQUEST':
          return { loading: true }
      case 'KOMUNA_CREATE_SUCCESS':
          return { loading: false, success: true }
      case 'KOMUNA_CREATE_FAIL':
          return { loading: false, error: action.payload }
      case 'CLEAR':
        return {}
      default:
          return state;
  }
}

function deleteKomunaReducer(state={ komuna: {}}, action) {
  switch (action.type) {
    case 'DELETE_KOMUNA_REQUEST':
      return { loading: true };
    case 'DELETE_KOMUNA_SUCCESS':
      return { loading: false, success: true};
    case 'DELETE_KOMUNA_FAIL':
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { komunaListReducer, createKomunReducer, deleteKomunaReducer }
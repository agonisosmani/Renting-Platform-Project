function shpalljaAllListReducer(state= { allShpalljet:[] }, action) {
  switch (action.type) {
      case 'SHPALLJA_ALL_LIST_REQUEST':
        return { loading: true, allShpalljet: [] }
      case 'SHPALLJA_ALL_LIST_SUCCESS':
        return { loading: false, allShpalljet: action.payload }
      case 'SHPALLJA_ALL_LIST_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state;
  }
}

function shpalljaListReducer(state= { shpalljet:[] }, action) {
    switch (action.type) {
        case 'SHPALLJA_LIST_REQUEST':
          return { loading: true, shpalljet: [] }
        case 'SHPALLJA_LIST_SUCCESS':
            //tek shpalljaRoutes e kom kete shpalljet(action.shpalljet) dhe kete categoryNotFound
          return { loading: false, shpalljet: action.payload.shpalljet, foundOrNot: action.payload.categoryNotFound }
        case 'SHPALLJA_LIST_FAIL':
          return { loading: false, error: action.payload }
        default:
          return state;
    }
}

function shpalljetMineReducer(state={ shpalljet: []}, action) {
    switch (action.type) {
      case 'SHPALLJA_MINE_REQUEST':
        return { loading: true };
      case 'SHPALLJA_MINE_SUCCESS':
        return { loading: false, shpalljet: action.payload };
      case 'SHPALLJA_MINE_FAIL':
        return { loading: false, error: action.payload };
      default: return state;
    }
}

function shpalljaDetailsReducer(state= {}, action) {
  switch (action.type) {
    case 'SHPALLJA_DETAILS_REQUEST':
      return {loading: true}
    case 'SHPALLJA_DETAILS_SUCCESS':
      return {loading: false, shpallja: action.payload, success: true}
    case 'SHPALLJA_DETAILS_FAIL':
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}

function shpalljaSaveReducer(state= { shpallja : {} }, action) {
    switch (action.type) {
        case 'SHPALLJA_SAVE_REQUEST':
            return { loading: true }
        case 'SHPALLJA_SAVE_SUCCESS':
            return { loading: false, success: true, shpallja: action.payload }
        case 'SHPALLJA_SAVE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function editShpalljaReducer(state={ shpallja: {}}, action) {
  switch (action.type) {
    case 'EDIT_SHPALLJA_REQUEST':
      return { loading: true };
    case 'EDIT_SHPALLJA_SUCCESS':
      return { loading: false, shpallja: action.payload , success: true};
    case 'EDIT_SHPALLJA_FAIL':
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function rateShpalljaReducer(state={ shpallja: {}}, action) {
  switch (action.type) {
    case 'RATE_SHPALLJA_REQUEST':
      return { loading: true };
    case 'RATE_SHPALLJA_SUCCESS':
      return { loading: false, shpallja: action.payload , success: true};
    case 'RATE_SHPALLJA_FAIL':
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function deleteShpalljaReducer(state={ shpallja: {}}, action) {
    switch (action.type) {
      case 'DELETE_SHPALLJA_REQUEST':
        return { loading: true };
      case 'DELETE_SHPALLJA_SUCCESS':
        return { loading: false, success: true};
      case 'DELETE_SHPALLJA_FAIL':
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

export { shpalljaSaveReducer, shpalljaListReducer, shpalljaAllListReducer, shpalljaDetailsReducer, shpalljetMineReducer, editShpalljaReducer, rateShpalljaReducer, deleteShpalljaReducer }
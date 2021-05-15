function categoryListReducer(state= { categories:[] }, action) {
    switch (action.type) {
        case 'CATEGORY_LIST_REQUEST':
            return { loading: true, categories: [] }
        case 'CATEGORY_LIST_SUCCESS':
            return { loading: false, categories: action.payload }
        case 'CATEGORY_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function categoryLengthReducer(state= { categoriesLength:[] }, action) {
  switch (action.type) {
      case 'CATEGORY_LENGTH_REQUEST':
          return { loading: true, categoriesLength: [] }
      case 'CATEGORY_LENGTH_SUCCESS':
          return { loading: false, categoriesLength: action.payload.CategoryLength }
      case 'CATEGORY_LENGTH_FAIL':
          return { loading: false, error: action.payload }
      default:
          return state;
  }
}

function deleteCategoryReducer(state={ category: {}}, action) {
  switch (action.type) {
    case 'DELETE_CATEGORY_REQUEST':
      return { loading: true };
    case 'DELETE_CATEGORY_SUCCESS':
      return { loading: false, success: true};
    case 'DELETE_CATEGORY_FAIL':
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { categoryListReducer, categoryLengthReducer, deleteCategoryReducer }
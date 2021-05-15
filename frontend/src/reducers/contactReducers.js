function contactListReducer(state= { contacts:[] }, action) {
  switch (action.type) {
      case 'CONTACTS_LIST_REQUEST':
          return { loading: true, contacts: [] }
      case 'CONTACTS_LIST_SUCCESS':
          return { loading: false, contacts: action.payload }
      case 'CONTACTS_LIST_FAIL':
          return { loading: false, error: action.payload }
      default:
          return state;
  }
}

function contactCreateReducer(state = {}, action) {
  switch (action.type) {
    case 'CONTACT_CREATE_REQUEST':
      return { loading: true };
    case 'CONTACT_CREATE_SUCCESS':
      return { loading: false, contact: action.payload, success: true };
    case 'CONTACT_CREATE_FAIL':
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { contactCreateReducer, contactListReducer };
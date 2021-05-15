function memberListReducer(state= { members:[] }, action) {
    switch (action.type) {
        case 'MEMBER_LIST_REQUEST':
            return { loading: true, members: [] }
        case 'MEMBER_LIST_SUCCESS':
            return { loading: false, members: action.payload }
        case 'MEMBER_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
function memberLengthReducer(state= { membersLength:[] }, action) {
    switch (action.type) {
        case 'MEMBER_LENGTH_REQUEST':
            return { loading: true, membersLength: [] }
        case 'MEMBER_LENGTH_SUCCESS':
            return { loading: false, membersLength: action.payload.MemberLength }
        case 'MEMBER_LENGTH_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
function deleteMemberReducer(state={ member: {}}, action) {
    switch (action.type) {
      case 'DELETE_MEMBER_REQUEST':
        return { loading: true };
      case 'DELETE_MEMBER_SUCCESS':
        return { loading: false, success: true};
      case 'DELETE_MEMBER_FAIL':
        return { loading: false, error: action.payload };
      default: return state;
    }
}

export { memberListReducer, memberLengthReducer, deleteMemberReducer }
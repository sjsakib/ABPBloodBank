const initialState = { ready: false, users: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_READY':
      return { ...state, ready: true, currentUser: action.currentUser};
    case 'UPDATE_CURRENT_USER':
      return { ...state, currentUser: action.currentUser };
    case 'UPDATE_USER_INFO':
      return { ...state, users: {...state.users, [action.key]: action.userInfo}};
    default:
      return state;
  }
};

const initialState = { ready: false };

export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_READY':
      return { ...state, ready: true, currentUser: action.currentUser, users: action.users };
    case 'UPDATE_CURRENT_USER':
      return { ...state, currentUser: action.currentUser };
    default:
      return state;
  }
};

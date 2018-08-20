const initialState = { ready: false };

export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_READY':
      return { ...state, ready: true, currentUser: action.currentUser, userList: action.userList };
    default:
      return state;
  }
};

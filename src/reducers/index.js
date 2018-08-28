const initialState = {
  ready: false,
  users: {},
  filters: { keyword: '', group: 'ALL', available: 'AVAILABLE' }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_READY':
      return { ...state, ready: true, currentUser: action.currentUser };
    case 'UPDATE_CURRENT_USER':
      return { ...state, currentUser: action.currentUser };
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        users: { ...state.users, [action.key]: action.userInfo }
      };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.val }
      };
    case 'SAVING_USER':
      return {
        ...state,
        savingUser: true
      };
    default:
      return state;
  }
};

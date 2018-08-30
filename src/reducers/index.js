const initialState = {
  ready: false,
  admins: [],
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
      const admins = state.admins.slice();
      if (action.userInfo.admin && !admins.includes(action.key))
        admins.push(action.key);
      return {
        ...state,
        admins,
        users: {
          ...state.users,
          [action.key]: { ...state.users[action.key], ...action.userInfo }
        }
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
